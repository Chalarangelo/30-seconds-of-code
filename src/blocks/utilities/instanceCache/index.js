/**
 * Caches instances of a class. Acts like an array-like and an object-like.
 */
export class InstanceCache {
  /**
   * Creates a new instance cache (initially empty).
   */
  constructor() {
    const instanceCache = {
      keys: new Set(),
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
    this._cache.keys.add(key);
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
    this._cache.keys.delete(key);
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
    return this._cache.keys.size;
  }

  /**
   * @returns {Array<string>} - The list of stored instance keys.
   */
  get keys() {
    return this._cache.keys;
  }

  /**
   * Determines if the instance cache contains an instance with the given key.
   * @param {string} key - The unique key/id of the instance.
   * @returns {boolean} `true` if the given `key` exists in the instance cache,
   *  `false` otherwise.
   */
  contains(key) {
    return this._cache.keys.has(key);
  }

  /**
   * Returns the first instance that satisfies the provided testing function.
   * If no values satisfies the testing function, `undefined` is returned.
   * @param {function} callback Function to execute on each value in the cache, taking 3 arguments:
   *  - `element` The current element in the cache.
   *  - `index` (optional) The index (position) of the current element in the cache.
   */
  find(callback) {
    for (const key of this._cache.keys) {
      if (callback(this[key])) return this[key];
    }
    return undefined;
  }

  /**
   * Returns all instances that satisfy the provided testing function.
   * If no values satisfies the testing function, an empty array is returned.
   * @param {function} callback Function to execute on each value in the cache, taking 3 arguments:
   *  - `element` The current element in the cache.
   *  - `index` (optional) The index (position) of the current element in the cache.
   */
  findAll(callback) {
    const instances = [];
    for (const key of this._cache.keys) {
      if (callback(this[key])) instances.push(this[key]);
    }
    return instances;
  }
}
