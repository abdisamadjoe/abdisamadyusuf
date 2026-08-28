/**
 * Custom caching helper to replace Next.js unstable_cache.
 * Runs in-memory, compatible with both build-time prerendering and browser runtimes.
 */
export function unstable_cache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts?: string[],
  options?: { revalidate?: number; tags?: string[] }
): T {
  const cacheMap = new Map<string, any>()

  return (async (...args: any[]) => {
    const cacheKey = JSON.stringify({ keyParts, args })
    if (cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey)
    }

    const promise = fn(...args)
    cacheMap.set(cacheKey, promise)

    try {
      const result = await promise
      cacheMap.set(cacheKey, result)
      return result
    } catch (error) {
      cacheMap.delete(cacheKey)
      throw error
    }
  }) as unknown as T
}
