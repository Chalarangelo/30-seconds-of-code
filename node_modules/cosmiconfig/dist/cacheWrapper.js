//      
'use strict';

function cacheWrapper   (cache                 , key        , fn         )    {
  if (!cache) {
    return fn();
  }

  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }

  const result = fn();
  cache.set(key, result);
  return result;
}

module.exports = cacheWrapper;
