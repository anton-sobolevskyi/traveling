import { Service } from '@angular/core';
import { REQUEST_CACHE_TTL } from '../constants';

@Service()
export class Cache {
  #timestamps = new Map<string, number>();
  #store = new Map<string, any>();

  getCacheKey(key: string, value: unknown): string {
    return JSON.stringify({ key, value });
  }

  getRecord<T>(key: string): T | undefined {
    const timestamp = this.#timestamps.get(key);
    const now = Date.now();

    if (timestamp && now - timestamp > REQUEST_CACHE_TTL) {
      this.#store.delete(key);
      this.#timestamps.delete(key);
      return undefined;
    }

    return this.#store.get(key);
  }

  setRecord<T>(key: string, value: T): void {
    this.#store.set(key, value);
    this.#timestamps.set(key, Date.now());
  }
}
