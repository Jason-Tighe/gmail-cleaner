const cache = new Map();

export async function setCache(key, value, expiration) {
    try {
        const expirationTime = Date.now() + expiration;
        cache.set(key, { value, expirationTime });
        return value;
    } catch (error) {
        console.error('Error in setCache:', error);
        throw error;
    }
}

export async function getCache(key) {
    try {
        const entry = cache.get(key);
        if (!entry) {
            return null;
        }
        if (Date.now() > entry.expirationTime) {
            cache.delete(key);
            return null;
        }
        return entry.value;
    } catch (error) {
        console.error('Error in getCache:', error);
        throw error;
    }
}

export async function clearCache(key) {
    try {
        if (key) {
            cache.delete(key);
        } else {
            cache.clear();
        }
    } catch (error) {
        console.error('Error in clearCache:', error);
        throw error;
    }
}

export async function estimateCacheSize(cacheObject) {
    try {
        const str = JSON.stringify(cacheObject);
        return Buffer.byteLength(str, 'utf8');
    } catch (error) {
        console.error('Error in estimateCacheSize:', error);
        return 0;
    }
}
