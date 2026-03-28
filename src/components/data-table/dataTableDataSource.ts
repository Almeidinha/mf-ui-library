import type {
  DataTableDataSourceCache,
  DataTableGetRowsParams,
  DataTableGetRowsResponse,
} from "./types";

export const DEFAULT_DATA_TABLE_DATA_SOURCE_CACHE_TTL = 5 * 60 * 1000;

type CacheEntry<T extends Record<string, unknown>> = {
  value: DataTableGetRowsResponse<T>;
  expiresAt: number;
};

function getExpiresAt(ttl: number) {
  return Number.isFinite(ttl) ? Date.now() + ttl : Number.POSITIVE_INFINITY;
}

export function serializeDataTableGetRowsParams(
  params: DataTableGetRowsParams,
) {
  const { signal: _signal, ...cacheableParams } = params;
  return JSON.stringify(cacheableParams);
}

export function createDataTableDataSourceCache<
  T extends Record<string, unknown>,
>(
  options?: {
    ttl?: number;
  },
): DataTableDataSourceCache<T> {
  const ttl =
    options?.ttl ?? DEFAULT_DATA_TABLE_DATA_SOURCE_CACHE_TTL;
  const entries = new Map<string, CacheEntry<T>>();

  return {
    get(params) {
      const key = serializeDataTableGetRowsParams(params);
      const entry = entries.get(key);

      if (!entry) {
        return undefined;
      }

      if (entry.expiresAt <= Date.now()) {
        entries.delete(key);
        return undefined;
      }

      return entry.value;
    },
    set(params, value) {
      entries.set(serializeDataTableGetRowsParams(params), {
        value,
        expiresAt: getExpiresAt(ttl),
      });
    },
    clear() {
      entries.clear();
    },
  };
}
