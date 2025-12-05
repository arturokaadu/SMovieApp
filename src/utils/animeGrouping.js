/**
 * Anime Grouping Utilities
 * 
 * Functions to detect and group anime seasons into single entries.
 * This prevents "One Punch Man Season 1" and "Season 2" appearing as separate results.
 */

/**
 * Extract base title by removing season indicators
 * @param {string} title - Full anime title
 * @returns {string} Base title without season indicators
 */
export const extractBaseTitle = (title) => {
    if (!title) return '';

    let baseTitle = title;

    // Specific fix for "Re:Zero" or titles where colon is part of base
    // If title starts with "Re:", we should be careful with colon removal
    // const isReZero = /^Re:/i.test(title);

    // Remove "Demon Slayer: " prefix explicitly to normalize with "Kimetsu no Yaiba"
    baseTitle = baseTitle.replace(/^Demon Slayer: /i, '');

    // Remove standard patterns
    // ORDER MATTERS: Longer/more specific patterns first!
    const standardPatterns = [
        / The Final Season/gi, // Match this before "Final Season"
        / Final Season/gi,
        / Season \d+/gi,
        / \d+(nd|rd|th) Season/gi,
        /: Season \d+/gi,
        / Part \d+/gi,
        / (II|III|IV|V|VI|VII|VIII|IX|X)+$/i, // Roman numerals II-X at end
        / \d+(nd|rd|th) Cour/gi,
        /: The Animation/gi,
        / \(TV\)/gi,
        / \(\d{4}\)/gi,
        /: (Ni|San|Yon|Go|Roku|Nana|Hachi|Kyuu|Juu) no Shou/gi,
        /: Second Season/gi,
        /: Third Season/gi,
        /: Fourth Season/gi,
        / - .+ Arc/gi, // Generic " - [Something] Arc" (Demon Slayer, etc.)
        /: .+-hen$/i, // Arcs like "Kimetsu no Yaiba: ...-hen" (End of string)
        /: .+-hen .+/i, // Arcs like "Kimetsu no Yaiba: ...-hen" followed by something
    ];

    standardPatterns.forEach(pattern => {
        baseTitle = baseTitle.replace(pattern, '').trim();
    });

    // Handle " 2", " 3" etc. but avoid " 100" or years if not in parens
    // Match space + single digit at end, or space + 2 digits if < 20?
    if (/ \d$/.test(baseTitle)) {
        baseTitle = baseTitle.replace(/ \d$/, '');
    }

    // Remove trailing colons and hyphens
    baseTitle = baseTitle.replace(/[:-]$/, '').trim();

    return baseTitle;
};

/**
 * Get season number from title
 * @param {string} title - Full anime title
 * @returns {number} Season number (1 if not detected)
 */
export const getSeasonNumber = (title) => {
    if (!title) return 1;

    // Match "Season X"
    const seasonMatch = title.match(/Season (\d+)/i);
    if (seasonMatch) return parseInt(seasonMatch[1]);

    // Match "Xnd/rd/th Season"
    const ordinalMatch = title.match(/(\d+)(nd|rd|th) Season/i);
    if (ordinalMatch) return parseInt(ordinalMatch[1]);

    // Match "Part X"
    const partMatch = title.match(/Part (\d+)/i);
    if (partMatch) return parseInt(partMatch[1]);

    // Match Roman numerals at end (e.g., "II", "III")
    const romanMatch = title.match(/ (II+)$/);
    if (romanMatch) return romanMatch[1].length;

    return 1; // Default to season 1
};

/**
 * Check if anime is the main/first season
 * @param {Object} anime - Anime object
 * @returns {boolean} True if this is likely the main entry
 */
export const isMainSeason = (anime) => {
    if (!anime || !anime.title) return true;

    const seasonNum = getSeasonNumber(anime.title);
    const hasSeasonIndicator = /Season|Part|II|Cour|Final/i.test(anime.title);

    // It's main if it's season 1 OR doesn't have season indicators
    return seasonNum === 1 || !hasSeasonIndicator;
};

/**
 * Group anime list by base title
 * Separates TV series (grouped) from Movies (individual)
 * Calculates total episodes and determines if franchise is airing
 * Filters out OVAs and Specials (unless searchQuery contains those terms)
 * 
 * @param {Array} animeList - Array of anime objects
 * @param {string} searchQuery - Optional search query to check for OVA/Special
 * @returns {Object} { series: [...], movies: [...] }
 */
export const groupAnimeByBase = (animeList, searchQuery = '') => {
    if (!animeList || !Array.isArray(animeList)) {
        return { series: [], movies: [] };
    }

    const grouped = new Map();
    const movies = [];
    const lowQuery = searchQuery.toLowerCase();

    // Check if user explicitly searched for OVAs or Specials
    const wantsOVA = lowQuery.includes('ova');
    const wantsSpecial = lowQuery.includes('special') || lowQuery.includes('especial');
    const wantsRecap = lowQuery.includes('recap') || lowQuery.includes('resumen');

    // Keywords that indicate non-main content (recaps, spinoffs, etc.)
    const SKIP_TITLE_KEYWORDS = [
        'recap', 'recapitulation', 'resumen',
        'summary', 'digest',
        'specials', 'zenyasai',
        'bouken karte', // Dr. Chopper spinoffs
        'picture drama',
        'bangaihen', 'gaiden', // Side stories
        'mini anime', 'petit', 'chibi',
        'koisuru', // Romance spinoffs like "Koisuru One Piece"
        // TV Specials keywords
        '3d2y', 'd2y',
        'fan letter',
        'heart of gold',
        'episode of', // "Episode of Nami", "Episode of Luffy" etc.
        'gold roger no densetsu',
        'mugiwara no luffy',
        'spa island',
        'jango no dance',
        'adventure of nebulandia',
        'romance dawn story', // One of the initial specials
    ];

    // Extract base title from search query for matching
    const searchBaseTitle = extractBaseTitle(lowQuery);

    animeList.forEach(anime => {
        // Movies are kept separate
        if (anime.type === 'Movie') {
            movies.push(anime);
            return;
        }

        // Filter out OVAs and Specials by type unless explicitly searched
        if (anime.type === 'OVA' && !wantsOVA) {
            return; // Skip OVAs
        }
        if (anime.type === 'Special' && !wantsSpecial) {
            return; // Skip Specials
        }

        // Filter out by title keywords (recaps, spinoffs, etc.)
        const lowerTitle = anime.title.toLowerCase();
        if (!wantsRecap && !wantsSpecial) {
            const hasSkipKeyword = SKIP_TITLE_KEYWORDS.some(kw => lowerTitle.includes(kw));
            if (hasSkipKeyword) {
                return; // Skip recaps and spinoffs
            }
        }

        // If we have a search query, only include anime that match the base title
        if (searchBaseTitle && searchBaseTitle.length > 2) {
            const animeBaseTitle = extractBaseTitle(anime.title).toLowerCase();
            // Check if the anime's base title contains/matches the search
            if (!animeBaseTitle.includes(searchBaseTitle) && !searchBaseTitle.includes(animeBaseTitle)) {
                // Different franchise - only show if it's an exact match in original title
                if (!lowerTitle.includes(searchBaseTitle)) {
                    return; // Skip unrelated anime
                }
            }
        }

        const baseTitle = extractBaseTitle(anime.title);

        if (!grouped.has(baseTitle)) {
            grouped.set(baseTitle, {
                main: anime,
                allSeasons: [anime],
                baseTitle
            });
        } else {
            const group = grouped.get(baseTitle);
            group.allSeasons.push(anime);

            // Update main if this is more "main" than current
            if (isMainSeason(anime) && !isMainSeason(group.main)) {
                group.main = anime;
            } else if (isMainSeason(anime) && isMainSeason(group.main)) {
                // Both are "main" - prefer earlier aired date
                const animeYear = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 9999;
                const mainYear = group.main.aired?.from ? new Date(group.main.aired.from).getFullYear() : 9999;
                if (animeYear < mainYear) {
                    group.main = anime;
                }
            }
        }
    });

    // Convert to array of main entries with aggregated data
    const series = Array.from(grouped.values()).map(group => {
        // Calculate total episodes across all seasons (excluding nulls)
        const totalEpisodes = group.allSeasons.reduce((sum, season) => {
            return sum + (season.episodes || 0);
        }, 0);

        // Determine if ANY season is currently airing
        const isAiring = group.allSeasons.some(season =>
            season.status === 'Currently Airing' || season.status === 'Not yet aired'
        );

        // Get the status to display
        const aggregatedStatus = isAiring ? 'Currently Airing' : group.main.status;

        return {
            ...group.main,
            episodes: totalEpisodes || group.main.episodes, // Use total if available
            status: aggregatedStatus, // Use aggregated status
            _hasMultipleSeasons: group.allSeasons.length > 1,
            _seasonCount: group.allSeasons.length,
            _totalEpisodes: totalEpisodes, // Explicit total
            _isAiring: isAiring, // Franchise airing flag
            _allSeasons: group.allSeasons // Expose all seasons
        };
    });

    return { series, movies };
};

/**
 * Check if two anime titles are related (same base)
 * @param {string} title1
 * @param {string} title2
 * @returns {boolean}
 */
export const areRelatedTitles = (title1, title2) => {
    if (!title1 || !title2) return false;
    return extractBaseTitle(title1) === extractBaseTitle(title2);
};
