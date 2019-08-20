# write [![NPM version](https://img.shields.io/npm/v/write.svg?style=flat)](https://www.npmjs.com/package/write) [![NPM monthly downloads](https://img.shields.io/npm/dm/write.svg?style=flat)](https://npmjs.org/package/write) [![NPM total downloads](https://img.shields.io/npm/dt/write.svg?style=flat)](https://npmjs.org/package/write) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/write.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/write)

> Write data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Thin wrapper around node's native fs methods.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save write
```

## Usage

```js
var writeFile = require('write');
```

## API

### [writeFile](index.js#L40)

Asynchronously writes data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Data can be a string or a buffer. Returns a promise if a callback function is not passed.

**Params**

* `filepath` **{string|Buffer|integer}**: filepath or file descriptor.
* `data` **{string|Buffer|Uint8Array}**: String to write to disk.
* `options` **{object}**: Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and/or [mkdirp](https://github.com/substack/node-mkdirp)
* `callback` **{Function}**: (optional) If no callback is provided, a promise is returned.

**Example**

```js
var writeFile = require('write');
writeFile('foo.txt', 'This is content...', function(err) {
  if (err) console.log(err);
});

// promise
writeFile('foo.txt', 'This is content...')
  .then(function() {
    // do stuff
  });
```

### [.promise](index.js#L82)

The promise version of [writeFile](#writefile). Returns a promise.

**Params**

* `filepath` **{string|Buffer|integer}**: filepath or file descriptor.
* `val` **{string|Buffer|Uint8Array}**: String or buffer to write to disk.
* `options` **{object}**: Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and/or [mkdirp](https://github.com/substack/node-mkdirp)
* `returns` **{Promise}**

**Example**

```js
var writeFile = require('write');
writeFile.promise('foo.txt', 'This is content...')
  .then(function() {
    // do stuff
  });
```

### [.sync](index.js#L120)

The synchronous version of [writeFile](#writefile). Returns undefined.

**Params**

* `filepath` **{string|Buffer|integer}**: filepath or file descriptor.
* `data` **{string|Buffer|Uint8Array}**: String or buffer to write to disk.
* `options` **{object}**: Options to pass to [fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) and/or [mkdirp](https://github.com/substack/node-mkdirp)
* `returns` **{undefined}**

**Example**

```js
var writeFile = require('write');
writeFile.sync('foo.txt', 'This is content...');
```

### [.stream](index.js#L151)

Uses `fs.createWriteStream` to write data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Data can be a string or a buffer. Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object.

**Params**

* `filepath` **{string|Buffer|integer}**: filepath or file descriptor.
* `options` **{object}**: Options to pass to [mkdirp](https://github.com/substack/node-mkdirp) and [fs.createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)
* `returns` **{Stream}**: Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object. (See [Writable Stream](https://nodejs.org/api/stream.html#stream_class_stream_writable)).

**Example**

```js
var fs = require('fs');
var writeFile = require('write');
fs.createReadStream('README.md')
  .pipe(writeFile.stream('a/b/c/other-file.md'))
  .on('close', function() {
    // do stuff
  });
```

## Release history

### v1.0.2 - 2017-07-11

* improved documentation

### v1.0.0 - 2017-07-09

**Added**

* [promise support](#promise)

**Changed**

* The main export will now return a promise if no callback is passed

## About

### Related projects

* [delete](https://www.npmjs.com/package/delete): Delete files and folders and any intermediate directories if they exist (sync and async). | [homepage](https://github.com/jonschlinkert/delete "Delete files and folders and any intermediate directories if they exist (sync and async).")
* [read-data](https://www.npmjs.com/package/read-data): Read JSON or YAML files. | [homepage](https://github.com/jonschlinkert/read-data "Read JSON or YAML files.")
* [read-yaml](https://www.npmjs.com/package/read-yaml): Very thin wrapper around js-yaml for directly reading in YAML files. | [homepage](https://github.com/jonschlinkert/read-yaml "Very thin wrapper around js-yaml for directly reading in YAML files.")
* [write-data](https://www.npmjs.com/package/write-data): Write a YAML or JSON file to disk. Automatically detects the format to write based… [more](https://github.com/jonschlinkert/write-data) | [homepage](https://github.com/jonschlinkert/write-data "Write a YAML or JSON file to disk. Automatically detects the format to write based on extension. Or pass `ext` on the options.")
* [write-json](https://www.npmjs.com/package/write-json): Write a JSON file to disk, also creates intermediate directories in the destination path if… [more](https://github.com/jonschlinkert/write-json) | [homepage](https://github.com/jonschlinkert/write-json "Write a JSON file to disk, also creates intermediate directories in the destination path if they don't already exist.")
* [write-yaml](https://www.npmjs.com/package/write-yaml): Write YAML. Converts JSON to YAML writes it to the specified file. | [homepage](https://github.com/jonschlinkert/write-yaml "Write YAML. Converts JSON to YAML writes it to the specified file.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 33 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [tunnckoCore](https://github.com/tunnckoCore) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on July 11, 2017._