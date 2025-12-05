const axios = require('axios');

const MANGA_UPDATES_API = 'https://api.mangaupdates.com/v1';

const searchManga = async (title) => {
    try {
        console.log(`Searching for: ${title}`);
        const response = await axios.post(`${MANGA_UPDATES_API}/series/search`, {
            search: title,
            per_page: 5
        });
        console.log(`Found ${response.data.results?.length || 0} results`);
        return response.data.results || [];
    } catch (error) {
        console.error('Error searching manga:', error.message);
        return [];
    }
};

const getMangaDetails = async (seriesId) => {
    try {
        console.log(`Fetching details for ID: ${seriesId}`);
        const response = await axios.get(`${MANGA_UPDATES_API}/series/${seriesId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching manga details:', error.message);
        return null;
    }
};

const test = async () => {
    const animeTitles = ['Jujutsu Kaisen', 'Demon Slayer', 'One Piece', 'Naruto'];

    for (const title of animeTitles) {
        console.log(`\n--- Testing ${title} ---`);
        const results = await searchManga(title);
        if (results.length > 0) {
            const firstMatch = results[0];
            console.log(`Best match: ${firstMatch.record.title} (ID: ${firstMatch.record.series_id})`);

            const details = await getMangaDetails(firstMatch.record.series_id);
            if (details) {
                console.log('Anime Chapter Mapping:', details.anime);
                if (details.anime) {
                    console.log(`Start: Ch ${details.anime.start?.chapter} Vol ${details.anime.start?.volume}`);
                    console.log(`End: Ch ${details.anime.end?.chapter} Vol ${details.anime.end?.volume}`);
                } else {
                    console.log('No anime mapping found in details.');
                }
            }
        } else {
            console.log('No results found.');
        }
    }
};

test();
