# find-cache-dir [![Build Status](https://travis-ci.org/jamestalmage/find-cache-dir.svg?branch=master)](https://travis-ci.org/jamestalmage/find-cache-dir) [![Coverage Status](https://coveralls.io/repos/jamestalmage/find-cache-dir/badge.svg?branch=master&service=github)](https://coveralls.io/github/jamestalmage/find-cache-dir?branch=master)

> Finds the common standard cache directory.

Recently the [`nyc`](https://www.npmjs.com/package/nyc) and [`AVA`](https://www.npmjs.com/package/ava) projects decided to standardize on a common directory structure for storing cache information: 

```sh
# nyc
./node_modules/.cache/nyc

# ava
./node_modules/.cache/ava

# your-module
./node_modules/.cache/your-module
```

This module makes it easy to correctly locate the cache directory according to this shared spec. If this pattern becomes ubiquitous, clearing the cache for multiple dependencies becomes easy and consistent:
 
```
rm -rf ./node_modules/.cache
```

If you decide to adopt this pattern, please file a PR adding your name to the list of adopters below. 


## Install

```
$ npm install --save find-cache-dir
```


## Usage

```js
const findCacheDir = require('find-cache-dir');

findCacheDir({name: 'unicorns'});
//=> /user/path/node-modules/.cache/unicorns
```


## API

### findCacheDir([options])

Finds the cache dir using the supplied options. The algorithm tries to find a `package.json` file, searching every parent directory of the `cwd` specified (or implied from other options). It returns a `string` containing the absolute path to the cache directory, or `null` if `package.json` was never found.

#### options

##### name

*Required*  
Type: `string` 

This should be the same as your project name in `package.json`.

##### files

Type: `array` of `string` 

An array of files that will be searched for a common parent directory. This common parent directory will be used in lieu of the `cwd` option below.

##### cwd

Type: `string`   
Default `process.cwd()`

The directory to start searching for a `package.json` from.

##### create

Type: `boolean`   
Default `false`

If `true`, the directory will be created synchronously before returning.

##### thunk

Type: `boolean`   
Default `false`

If `true`, this modifies the return type to be a function that is a thunk for `path.join(theFoundCacheDirectory)`.

```js
const thunk = findCacheDir({name: 'foo', thunk: true});

thunk();
//=> /some/path/node_modules/.cache/foo

thunk('bar.js')
//=> /some/path/node_modules/.cache/foo/bar.js

thunk('baz', 'quz.js')
//=> /some/path/node_modules/.cache/foo/baz/quz.js
```

This is helpful for actually putting actual files in the cache!

## Adopters

- [`NYC`](https://www.npmjs.com/package/nyc)
- [`AVA`](https://www.npmjs.com/package/ava)

## License

MIT © [James Talmage](http://github.com/jamestalmage)
