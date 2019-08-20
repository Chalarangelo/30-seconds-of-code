# Node Cache Manager store for Filesystem

[![Build Status](https://travis-ci.org/rolandstarke/node-cache-manager-fs-hash.svg?branch=master)](https://travis-ci.org/rolandstarke/node-cache-manager-fs-hash)
[![dependencies Status](https://david-dm.org/rolandstarke/node-cache-manager-fs-hash/status.svg)](https://david-dm.org/rolandstarke/node-cache-manager-fs-hash)
[![npm package](https://img.shields.io/npm/v/cache-manager-fs-hash.svg)](https://www.npmjs.com/package/cache-manager-fs-hash)
[![node](https://img.shields.io/node/v/cache-manager-fs-hash.svg)](https://nodejs.org)

A Filesystem store for the [node-cache-manager](https://github.com/BryanDonovan/node-cache-manager) module

## Installation

```sh
npm install cache-manager-fs-hash --save
```

## Features

* Saves anything that is `JSON.stringify`-able to disk
* Buffers are saved as well (if they reach a certain size they will be stored to separate files)
* Works well with the cluster module

## Usage example

Here is an example that demonstrates how to implement the Filesystem cache store.

```javascript
const cacheManager = require('cache-manager');
const fsStore = require('cache-manager-fs-hash');

const diskCache = cacheManager.caching({
    store: fsStore,
    options: {
        path: 'diskcache', //path for cached files
        ttl: 60 * 60,      //time to life in seconds
        subdirs: true,     //create subdirectories to reduce the 
                           //files in a single dir (default: false)
    }
});


(async () => {

    await diskCache.set('key', 'value');
    console.log(await diskCache.get('key')); //"value"
    await diskCache.del('key');
    console.log(await diskCache.get('key')); //undefined


    console.log(await getUserCached(5)); //{id: 5, name: '...'}
    console.log(await getUserCached(5)); //{id: 5, name: '...'}

    await diskCache.reset();

    function getUserCached(userId) {
        return diskCache.wrap(userId, function () {
            return getUser(userId);
        });
    }

    async function getUser(userId) {
        return {id: userId, name: '...'};
    }

})();
```

## How it works

The filename is determined by the md5 hash of the `key`. (The `key` is also saved in the file to detect hash collisions. In this case it will just return a cache miss). Writing is performed with .lock files so that multiple instances of the library (e.g. using the cluster module) do not interfere with one another.

## Tests

```sh
npm test
```

## License

cache-manager-fs-hash is licensed under the MIT license.