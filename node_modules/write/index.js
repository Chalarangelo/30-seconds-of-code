/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * Asynchronously writes data to a file, replacing the file if it already
 * exists and creating any intermediate directories if they don't already
 * exist. Data can be a string or a buffer. Returns a promise if a callback
 * function is not passed.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile('foo.txt', 'This is content...', function(err) {
 *   if (err) console.log(err);
 * });
 *
 * // promise
 * writeFile('foo.txt', 'This is content...')
 *   .then(function() {
 *     // do stuff
 *   });
 * ```
 * @name writeFile
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `data` String to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFile][fs]{#fs_fs_writefile_file_data_options_callback} and/or [mkdirp][]
 * @param {Function} `callback` (optional) If no callback is provided, a promise is returned.
 * @api public
 */

function writeFile(filepath, data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    return writeFile.promise.apply(null, arguments);
  }

  if (typeof filepath !== 'string') {
    cb(new TypeError('expected filepath to be a string'));
    return;
  }

  mkdirp(path.dirname(filepath), options, function(err) {
    if (err) {
      cb(err);
      return;
    }
    fs.writeFile(filepath, data, options, cb);
  });
};

/**
 * The promise version of [writeFile](#writefile). Returns a promise.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.promise('foo.txt', 'This is content...')
 *   .then(function() {
 *     // do stuff
 *   });
 * ```
 * @name .promise
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `val` String or buffer to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFile][fs]{#fs_fs_writefile_file_data_options_callback} and/or [mkdirp][]
 * @return {Promise}
 * @api public
 */

writeFile.promise = function(filepath, val, options) {
  if (typeof filepath !== 'string') {
    return Promise.reject(new TypeError('expected filepath to be a string'));
  }

  return new Promise(function(resolve, reject) {
    mkdirp(path.dirname(filepath), options, function(err) {
      if (err) {
        reject(err);
        return;
      }

      fs.writeFile(filepath, val, options, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  });
};

/**
 * The synchronous version of [writeFile](#writefile). Returns undefined.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.sync('foo.txt', 'This is content...');
 * ```
 * @name .sync
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `data` String or buffer to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFileSync][fs]{#fs_fs_writefilesync_file_data_options} and/or [mkdirp][]
 * @return {undefined}
 * @api public
 */

writeFile.sync = function(filepath, data, options) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  mkdirp.sync(path.dirname(filepath), options);
  fs.writeFileSync(filepath, data, options);
};

/**
 * Uses `fs.createWriteStream` to write data to a file, replacing the
 * file if it already exists and creating any intermediate directories
 * if they don't already exist. Data can be a string or a buffer. Returns
 * a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream)
 * object.
 *
 * ```js
 * var fs = require('fs');
 * var writeFile = require('write');
 * fs.createReadStream('README.md')
 *   .pipe(writeFile.stream('a/b/c/other-file.md'))
 *   .on('close', function() {
 *     // do stuff
 *   });
 * ```
 * @name .stream
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {object} `options` Options to pass to [mkdirp][] and [fs.createWriteStream][fs]{#fs_fs_createwritestream_path_options}
 * @return {Stream} Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object. (See [Writable Stream](https://nodejs.org/api/stream.html#stream_class_stream_writable)).
 * @api public
 */

writeFile.stream = function(filepath, options) {
  mkdirp.sync(path.dirname(filepath), options);
  return fs.createWriteStream(filepath, options);
};

/**
 * Expose `writeFile`
 */

module.exports = writeFile;
