"use strict";

const Cache = require(`./cache`);

let caches = new Map();

module.exports = function getCache(name) {
  let cache = caches.get(name);

  if (!cache) {
    cache = new Cache({
      name
    }).init();
    caches.set(name, cache);
  }

  return cache;
};
//# sourceMappingURL=get-cache.js.map