import axios from 'axios';

const BASE_URL = "https://api.jikan.moe/v4";

// Jikan doesn't have a global news endpoint, so we'll fetch news for a currently popular anime
// ID 52991 is Frieren, 44511 is Chainsaw Man, 40748 is JJK
const NEWS_SOURCE_ID = 52991;

export const getAnimeNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/anime/${NEWS_SOURCE_ID}/news`);
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { data: [] };
    }
};
