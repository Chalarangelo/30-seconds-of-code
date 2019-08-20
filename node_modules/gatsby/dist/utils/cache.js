"use strict";

const fs = require(`fs-extra`);

const manager = require(`cache-manager`);

const fsStore = require(`cache-manager-fs-hash`);

const path = require(`path`);

const MAX_CACHE_SIZE = 250;
const TTL = Number.MAX_SAFE_INTEGER;

class Cache {
  constructor({
    name = `db`,
    store = fsStore
  } = {}) {
    this.name = name;
    this.store = store;
  }

  get directory() {
    return path.join(process.cwd(), `.cache/caches/${this.name}`);
  }

  init() {
    fs.ensureDirSync(this.directory);
    const caches = [{
      store: `memory`,
      max: MAX_CACHE_SIZE
    }, {
      store: this.store,
      options: {
        path: this.directory,
        ttl: TTL
      }
    }].map(cache => manager.caching(cache));
    this.cache = manager.multiCaching(caches);
    return this;
  }

  get(key) {
    return new Promise(resolve => {
      this.cache.get(key, (err, res) => {
        resolve(err ? undefined : res);
      });
    });
  }

  set(key, value, args = {}) {
    return new Promise(resolve => {
      this.cache.set(key, value, args, err => {
        resolve(err ? undefined : value);
      });
    });
  }

}

module.exports = Cache;
//# sourceMappingURL=cache.js.map