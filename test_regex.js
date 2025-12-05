const parseMangaInfo = (text) => {
    if (!text || typeof text !== 'string') return { chapter: null, volume: null };

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

const tests = [
    "Vol 1, Chap 1 (Chap 1 adapted in EP 4)",
    "Vol 108, Chap 1107 (As of EP 1141)",
    "Vol 1, Chap 1 (Naruto) / Vol 28, Chap 245 (Shippuden)",
    "Starts at Vol 1, Chap 1",
    "No mapping"
];

tests.forEach(t => {
    console.log(`"${t}" ->`, parseMangaInfo(t));
});
