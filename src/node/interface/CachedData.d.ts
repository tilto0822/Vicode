export type CachedData<T> = {
  readonly isCached: boolean;
  readonly expiration: Date | null;
  readonly value: T | null;
};

export default CachedData;
