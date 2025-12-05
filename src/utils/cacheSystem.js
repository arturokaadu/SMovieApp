/**
 * Advanced Caching and Request Optimization System
 * Features:
 * - LRU Cache with configurable TTL
 * - Request deduplication (in-flight requests)
 * - Prefetching based on user behavior
 * - Concurrent request limiting
 * - Automatic cache invalidation
 */

// LRU Cache Implementation
class LRUCache {
    constructor(maxSize = 100, ttlMs = 5 * 60 * 1000) { // 5 min default TTL
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttlMs = ttlMs;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        // Check TTL
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, item);
        return item.value;
    }

    set(key, value, customTtl = null) {
        // Remove oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            value,
            expiry: Date.now() + (customTtl || this.ttlMs)
        });
    }

    has(key) {
        return this.get(key) !== null;
    }

    clear() {
        this.cache.clear();
    }
}

// In-flight request tracker for deduplication
class RequestDeduplicator {
    constructor() {
        this.inFlight = new Map();
    }

    async dedupe(key, requestFn) {
        // If same request is already in flight, wait for it
        if (this.inFlight.has(key)) {
            return this.inFlight.get(key);
        }

        // Start new request
        const promise = requestFn()
            .finally(() => {
                this.inFlight.delete(key);
            });

        this.inFlight.set(key, promise);
        return promise;
    }
}

// Priority Queue for request ordering
class PriorityRequestQueue {
    constructor(concurrencyLimit = 4, minDelayMs = 350) {
        this.queue = [];
        this.activeCount = 0;
        this.concurrencyLimit = concurrencyLimit;
        this.minDelayMs = minDelayMs;
        this.lastRequestTime = 0;
    }

    async add(requestFn, priority = 0) {
        return new Promise((resolve, reject) => {
            this.queue.push({ requestFn, priority, resolve, reject });
            this.queue.sort((a, b) => b.priority - a.priority);
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.activeCount >= this.concurrencyLimit || this.queue.length === 0) {
            return;
        }

        // Rate limiting
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.minDelayMs) {
            setTimeout(() => this.processQueue(), this.minDelayMs - timeSinceLastRequest);
            return;
        }

        const { requestFn, resolve, reject } = this.queue.shift();
        this.activeCount++;
        this.lastRequestTime = Date.now();

        try {
            const result = await requestFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.activeCount--;
            this.processQueue();
        }
    }
}

// Prefetch Manager
class PrefetchManager {
    constructor(cache, deduplicator) {
        this.cache = cache;
        this.deduplicator = deduplicator;
        this.prefetchQueue = new Set();
    }

    schedulePrefetech(key, fetchFn, delay = 100) {
        if (this.cache.has(key) || this.prefetchQueue.has(key)) {
            return;
        }

        this.prefetchQueue.add(key);

        // Use requestIdleCallback for non-blocking prefetch
        const scheduleFn = window.requestIdleCallback || setTimeout;

        scheduleFn(() => {
            if (!this.cache.has(key)) {
                this.deduplicator.dedupe(key, fetchFn)
                    .then(data => {
                        this.cache.set(key, data);
                    })
                    .catch(() => { })
                    .finally(() => {
                        this.prefetchQueue.delete(key);
                    });
            }
        }, { timeout: delay });
    }
}

// Create singletons with OPTIMIZED TTL values
// Longer TTL = fewer API calls = faster loading
export const apiCache = new LRUCache(300, 15 * 60 * 1000); // 15 min TTL (increased from 10)
export const episodeCache = new LRUCache(500, 60 * 60 * 1000); // 1 hour for episodes (increased from 30 min)
export const imageCache = new LRUCache(1000, 2 * 60 * 60 * 1000); // 2 hours for images (increased from 1)
export const requestDeduplicator = new RequestDeduplicator();
export const requestQueue = new PriorityRequestQueue(6, 300); // Increased concurrency to 6, reduced delay to 300ms
export const prefetchManager = new PrefetchManager(apiCache, requestDeduplicator);

// Helper function for cached API calls
export const cachedFetch = async (cacheKey, fetchFn, options = {}) => {
    const {
        cache = apiCache,
        ttl = null,
        priority = 0,
        bypassCache = false
    } = options;

    // Check cache first
    if (!bypassCache) {
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }
    }

    // Dedupe and queue the request
    const result = await requestDeduplicator.dedupe(cacheKey, () =>
        requestQueue.add(fetchFn, priority)
    );

    // Cache the result
    cache.set(cacheKey, result, ttl);
    return result;
};

// Batch request utility for multiple IDs
export const batchFetch = async (ids, fetchSingleFn, getCacheKey, options = {}) => {
    const { maxConcurrent = 4, delayBetween = 100 } = options;

    const results = new Map();
    const uncachedIds = [];

    // Check cache first
    for (const id of ids) {
        const cacheKey = getCacheKey(id);
        const cached = apiCache.get(cacheKey);
        if (cached) {
            results.set(id, cached);
        } else {
            uncachedIds.push(id);
        }
    }

    // Fetch uncached items in batches
    const batches = [];
    for (let i = 0; i < uncachedIds.length; i += maxConcurrent) {
        batches.push(uncachedIds.slice(i, i + maxConcurrent));
    }

    for (const batch of batches) {
        const batchPromises = batch.map(id =>
            fetchSingleFn(id)
                .then(data => {
                    apiCache.set(getCacheKey(id), data);
                    results.set(id, data);
                    return data;
                })
                .catch(err => {
                    console.warn(`Failed to fetch ${id}:`, err);
                    return null;
                })
        );

        await Promise.all(batchPromises);

        // Small delay between batches
        if (batches.indexOf(batch) < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, delayBetween));
        }
    }

    return results;
};

// Preload common data on app start
export const preloadCommonData = () => {
    // This can be called on app mount to preload popular data
    console.log('[Cache] Preloading common data...');
};

// Export for debugging
if (typeof window !== 'undefined') {
    window.__apiCache = apiCache;
    window.__episodeCache = episodeCache;
}
