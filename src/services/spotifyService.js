/**
 * Service to handle Spotify and YouTube integrations
 */

// Spotify Embed Base URL
const SPOTIFY_EMBED_BASE = "https://open.spotify.com/embed";

/**
 * Generates a Spotify Embed URL for an album, playlist, or track
 * @param {string} type - 'album', 'playlist', or 'track'
 * @param {string} id - The Spotify ID
 * @returns {string} - The embed URL
 */
export const getSpotifyEmbedUrl = (type, id) => {
    return `${SPOTIFY_EMBED_BASE}/${type}/${id}?utm_source=generator&theme=0`;
};

/**
 * Generates a YouTube Embed URL
 * @param {string} videoId - The YouTube Video ID
 * @returns {string} - The embed URL
 */
export const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Opens a Spotify search in a new tab (helper for finding IDs)
 * @param {string} query - The search query (e.g., anime title)
 */
export const openSpotifySearch = (query) => {
    const encodedQuery = encodeURIComponent(query + " OST");
    window.open(`https://open.spotify.com/search/${encodedQuery}`, '_blank');
};

/**
 * Opens a YouTube search in a new tab
 * @param {string} query - The search query
 */
export const openYouTubeSearch = (query) => {
    const encodedQuery = encodeURIComponent(query + " opening ending full");
    window.open(`https://www.youtube.com/results?search_query=${encodedQuery}`, '_blank');
};
