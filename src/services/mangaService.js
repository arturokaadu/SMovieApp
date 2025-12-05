import axios from 'axios';

const MANGA_UPDATES_API = 'https://api.mangaupdates.com/v1';

/**
 * Search for manga by title on MangaUpdates
 * @param {string} title - The manga/anime title to search for
 * @returns {Promise<Array>} Array of matching manga series
 */
export const searchManga = async (title) => {
    try {
        const response = await axios.post(`${MANGA_UPDATES_API}/series/search`, {
            search: title,
            per_page: 5
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Error searching manga:', error);
        return [];
    }
};

/**
 * Get detailed series information including anime chapter mapping
 * @param {number} seriesId - MangaUpdates series ID
 * @returns {Promise<Object|null>} Series details or null
 */
export const getMangaDetails = async (seriesId) => {
    try {
        const response = await axios.get(`${MANGA_UPDATES_API}/series/${seriesId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching manga details:', error);
        return null;
    }
};

/**
 * Parse chapter and volume from MangaUpdates string
 * Format examples: 
 * "Vol 1, Chap 1"
 * "Vol 108, Chap 1107 (As of EP 1141)"
 * "Starts at Vol 1, Chap 1"
 * @param {string} text 
 * @returns {Object} { chapter, volume }
 */
const parseMangaInfo = (text) => {
    if (!text || typeof text !== 'string') return { chapter: null, volume: null };

    // Try to find the last occurrence of Chapter/Chap and Volume/Vol
    // This helps with strings like "Vol 1, Chap 1 ... Vol 5, Chap 20" -> We usually want the end point

    // Regex for Chapter
    const chapMatches = [...text.matchAll(/Chap(?:ter)?\.?\s*(\d+)/gi)];
    const lastChapMatch = chapMatches.length > 0 ? chapMatches[chapMatches.length - 1] : null;

    // Regex for Volume
    const volMatches = [...text.matchAll(/Vol(?:ume)?\.?\s*(\d+)/gi)];
    const lastVolMatch = volMatches.length > 0 ? volMatches[volMatches.length - 1] : null;

    return {
        chapter: lastChapMatch ? parseInt(lastChapMatch[1]) : null,
        volume: lastVolMatch ? parseInt(lastVolMatch[1]) : null
    };
};

/**
 * Find manga continuation info for an anime
 * Searches MangaUpdates and extracts anime chapter mapping
 * @param {string} animeTitle - The anime title to look up
 * @returns {Promise<Object|null>} Continuation info { chapter, volume, mangaTitle, mangaUrl }
 */
export const getMangaContinuation = async (animeTitle) => {
    try {
        // Clean up title for better search results
        let cleanTitle = animeTitle
            .replace(/Season \d+/i, '')
            .replace(/Part \d+/i, '')
            .replace(/\d+(st|nd|rd|th) Season/i, '')
            .replace(/\s+/g, ' ')
            .trim();

        // Manual overrides for known tricky titles
        if (cleanTitle.toLowerCase().includes('demon slayer')) cleanTitle = 'Kimetsu no Yaiba';
        if (cleanTitle.toLowerCase().includes('attack on titan')) cleanTitle = 'Shingeki no Kyojin';
        if (cleanTitle.toLowerCase().includes('my hero academia')) cleanTitle = 'Boku no Hero Academia';
        if (cleanTitle.toLowerCase().includes('jujutsu kaisen')) cleanTitle = 'Jujutsu Kaisen';

        // 1. Search on MangaUpdates
        const searchResults = await searchManga(cleanTitle);
        let bestMatch = null;
        if (searchResults.length > 0) {
            bestMatch = searchResults.find(result => {
                const title = result.record?.title?.toLowerCase() || '';
                const cleanLower = cleanTitle.toLowerCase();
                return title === cleanLower || title.includes(cleanLower) || cleanLower.includes(title);
            }) || searchResults[0];
        }

        let mangaDetails = null;
        if (bestMatch?.record?.series_id) {
            mangaDetails = await getMangaDetails(bestMatch.record.series_id);
        }

        // 2. Search on AniList (for description and total chapters backup)
        // We use a simple fetch here to avoid circular dependencies with aniListService if possible, 
        // or just import it if it's clean. Let's assume we can fetch directly for this specific specialized need.
        const aniListQuery = `
        query ($search: String) {
          Media(search: $search, type: MANGA) {
            id
            title { romaji english }
            description
            chapters
            volumes
            siteUrl
            coverImage { extraLarge }
          }
        }
        `;

        let aniListData = null;
        try {
            const alResponse = await axios.post('https://graphql.anilist.co', {
                query: aniListQuery,
                variables: { search: cleanTitle }
            });
            aniListData = alResponse.data?.data?.Media;
        } catch (e) {
            console.warn('AniList manga search failed:', e.message);
        }

        // 3. TEXT MINING / NLP-LITE
        // Try to extract "Ends at Chapter X" from descriptions
        const descriptions = [
            mangaDetails?.description,
            mangaDetails?.anime?.start, // detailed fields from MU
            mangaDetails?.anime?.end,
            aniListData?.description
        ].filter(Boolean).join('\n');

        // Regex patterns to capture "Ends at Chapter X" or "Adapted up to Volume Y"
        // We look for patterns connecting "Anime" or "Season" with "Chapter" or "Vol"
        const patterns = [
            /ends? at vol(?:ume)?\.?\s*(\d+)/i,          // "Ends at Vol 12"
            /ends? at chap(?:ter)?\.?\s*(\d+)/i,         // "Ends at Chapter 50"
            /adapts? (?:up to|covers?) vol(?:ume)?\.?\s*(\d+)/i, // "Adapts up to Volume 5"
            /adapts? (?:up to|covers?) chap(?:ter)?\.?\s*(\d+)/i, // "Adapts up to Chapter 53"
            /up to chap(?:ter)?\.?\s*(\d+)/i,            // "Up to Chapter 63"
            /corresponds? to chap(?:ter)?\.?\s*(\d+)/i   // "Corresponds to Chapter 20"
        ];

        let extractedChapter = null;
        let extractedVolume = null;
        // Check regular parsing from MU specific fields first
        if (mangaDetails?.anime) {
            // const startInfo = parseMangaInfo(mangaDetails.anime.start);
            const endInfo = parseMangaInfo(mangaDetails.anime.end);
            if (endInfo.chapter) extractedChapter = endInfo.chapter;
            if (endInfo.volume) extractedVolume = endInfo.volume;
        }

        // If MU specific fields failed, try text mining descriptions
        if (!extractedChapter) {
            for (const pattern of patterns) {
                const match = descriptions.match(pattern);
                if (match) {
                    // Check if it captured a volume or chapter based on the pattern
                    if (pattern.source.includes('vol')) {
                        extractedVolume = parseInt(match[1]);
                    } else {
                        extractedChapter = parseInt(match[1]);
                    }
                    if (extractedChapter) break; // Priority to chapter
                }
            }
        }

        // Consolidate Data
        const title = mangaDetails?.title || aniListData?.title?.romaji || animeTitle;
        const totalChapters = mangaDetails?.latest_chapter || aniListData?.chapters || null;
        const image = mangaDetails?.image?.url?.original || aniListData?.coverImage?.extraLarge;
        const url = aniListData?.siteUrl || mangaDetails?.url;

        return {
            mangaTitle: title,
            mangaUrl: url,
            startChapter: 1, // Usually 1 unless specified otherwise
            endChapter: extractedChapter,
            startVolume: 1,
            endVolume: extractedVolume,
            coverUrl: image,
            description: aniListData?.description || mangaDetails?.description,
            totalChapters: totalChapters ? parseInt(totalChapters) : null,
            source: aniListData ? 'AniList' : 'MangaUpdates'
        };

    } catch (error) {
        console.error('Error getting manga continuation:', error);
        return null;
    }
};

/**
 * Get manga continuation with smart dynamic resolution
 * Uses multiple strategies to find the best mapping
 * @param {number} malId - MyAnimeList anime ID
 * @param {string} animeTitle - Anime title for API search
 * @returns {Promise<Object|null>} Continuation info
 */
export const getMangaContinuationWithFallback = async (malId, animeTitle) => {
    console.log(`[SmartResolver] Starting resolution for: ${animeTitle} (MAL ID: ${malId})`);

    // Strategy 1: Smart API Search (MangaUpdates + AniList)
    // We strive to find real data first
    const apiResult = await getMangaContinuation(animeTitle);

    // Check if we got high-confidence data (explicit start/end chapters)
    if (apiResult && apiResult.endChapter) {
        console.log(`[SmartResolver] Found exact mapping via API for ${animeTitle}`);
        return { ...apiResult, method: 'Exact/API' };
    }

    // Strategy 2: If API gave us generic info but no chapters, try to estimate based on pacing
    if (apiResult && apiResult.totalChapters) {
        // We have total chapters, we can calculate a pacing ratio if we know total episodes
        // This will be handled in the UI component where we have access to episode count
        // reusing the apiResult which contains helpful metadata
        return { ...apiResult, method: 'Estimation/Metadata' };
    }

    // Return what we found even if incomplete, UI will handle fallback
    return apiResult || { method: 'Failed' };
};

