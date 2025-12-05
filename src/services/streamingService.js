// TODO: Implement Streaming Service
// Use AniList or Consumet to find where to watch

export const getStreamingPlatforms = async (animeId) => {
    // 1. Try AniList (via anilistService)
    // 2. Try Consumet (if configured)
    // 3. Return list of platforms { name, url, icon }
    return [
        { name: 'Crunchyroll', url: '#', icon: 'simple-icons:crunchyroll' },
        { name: 'Netflix', url: '#', icon: 'simple-icons:netflix' }
    ];
};
