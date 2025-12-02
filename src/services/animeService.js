import axios from 'axios';

const API_URL = 'https://api.jikan.moe/v4';

// Helper to handle delays if needed (Jikan has rate limits)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTopAnime = async (page = 1, filter = 'bypopularity') => {
  try {
    const response = await axios.get(`${API_URL}/top/anime`, {
      params: {
        page,
        filter
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    throw error;
  }
};

export const searchAnime = async (query, page = 1, sfw = true) => {
  try {
    const response = await axios.get(`${API_URL}/anime`, {
      params: {
        q: query,
        page,
        sfw: sfw, // Safe For Work filter
        order_by: 'popularity',
        sort: 'asc'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
};

export const getAnimeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/anime/${id}/full`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching details for anime ${id}:`, error);
    throw error;
  }
};

export const getAnimeCharacters = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/anime/${id}/characters`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching characters for anime ${id}:`, error);
    throw error;
  }
};

export const getSeasonNow = async (page = 1, sfw = true) => {
  try {
    const response = await axios.get(`${API_URL}/seasons/now`, {
      params: {
        page,
        sfw
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current season:", error);
    throw error;
  }
};

export const searchCharacters = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/characters`, {
      params: {
        q: query,
        limit: 10
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching characters:", error);
    throw error;
  }
};

export const getAnimeEpisodes = async (id, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/anime/${id}/episodes`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching episodes for anime ${id}:`, error);
    throw error;
  }
};

export const getAnimeVideos = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/anime/${id}/videos`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching videos for anime ${id}:`, error);
    throw error;
  }
};
