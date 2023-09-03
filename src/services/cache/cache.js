import { LocalStorage } from './storage/localStorage';
import config from '../../config';
import { IS_BROWSER } from '../../utils/isBrowser';

class Cache {
  constructor(storage, options = {}) {
    this.cache = new Map();
    this.storage = storage;
    this.key = options.key || config.cache.key;
    this.isFlushing = false;

    this._loadFromStorage();
  }

  _loadFromStorage() {
    const loadedCache = this.storage.get(this.key);

    if (loadedCache) {
      try {
        this.cache = new Map(Object.entries(JSON.parse(loadedCache)));
      } catch {
        console.log('Cache storage is corrupted. Reinitializing...');
        this._flush(true);
      }
    }
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
    this._flush();
  }

  delete(key) {
    this.cache.delete(key);
    this._flush();
  }

  clear() {
    this.cache.clear();
  }

  _flush(isSync) {
    if (isSync) {
      this.isFlushing = false;
      this.storage.set(
        this.key,
        JSON.stringify(Object.fromEntries(this.cache)),
      );
    } else if (!this.isFlushing) {
      this.isFlushing = true;
      requestIdleCallback(() => this._flush(true));
    }
  }
}

export const cache = new Cache(IS_BROWSER ? new LocalStorage() : new Map());
