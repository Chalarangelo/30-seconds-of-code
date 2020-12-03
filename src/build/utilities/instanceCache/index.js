/**
 * Caches instances of a class. Acts like an array-like and an object-like.
 */
export class InstanceCache {
  /**
   * Creates a new instance cache (initially empty).
   */
  constructor() {
    const instanceCache = {
      keys: [],
    };
    this._cache = instanceCache;
  }

  /**
   * Adds the provided key-value pair to the instance cache.
   * @param {string} key - The unique key/id of the instance.
   * @param {*} value - The instance object to be cached.
   */
  add(key, value) {
    this._cache[key] = value;
    this._cache.keys.push(key);
    Object.defineProperty(this, key, {
      get() {
        return this._cache[key];
      },
      configurable: true,
    });
  }

  /**
   * Removes the provided key-value pair from the instance cache.
   * @param {string} key - The unique key/id of the instance.
   */
  remove(key) {
    this._cache[key] = undefined;
    this._cache.keys.splice(this._cache.keys.indexOf(key), 1);
    Object.defineProperty(this, key, {
      get() {
        return undefined;
      },
      configurable: true,
    });
  }

  /**
   * Removes all key-value pairs from the instance cache.
   */
  clear() {
    [...this._cache.keys].forEach(key => this.remove(key));
  }

  *[Symbol.iterator]() {
    for (let k of this._cache.keys) yield this._cache[k];
  }

  /**
   * @returns {number} - The number of stored instances.
   */
  get length() {
    return this._cache.keys.length;
  }

  /**
   * Determines if the instance cache contains an instance with the given key.
   * @param {string} key - The unique key/id of the instance.
   * @returns {boolean} `true` if the given `key` exists in the instance cache,
   *  `false` otherwise.
   */
  contains(key) {
    return this._cache.keys.indexOf(key) !== 0;
  }
}
