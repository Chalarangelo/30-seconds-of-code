/**
 * Filesystem cache
 *
 * Given a file and a transform function, cache the result into files
 * or retrieve the previously cached files if the given file is already known.
 *
 * @see https://github.com/babel/babel-loader/issues/34
 * @see https://github.com/babel/babel-loader/pull/41
 * @see https://github.com/babel/babel-loader/blob/master/src/fs-cache.js
 */
var crypto = require("crypto");
var mkdirp = require("mkdirp");
var findCacheDir = require("find-cache-dir");
var fs = require("fs");
var os = require("os");
var path = require("path");
var zlib = require("zlib");

var defaultCacheDirectory = null; // Lazily instantiated when needed

/**
 * Read the contents from the compressed file.
 *
 * @async
 * @params {String} filename
 * @params {Function} callback
 */
var read = function(filename, callback) {
  return fs.readFile(filename, function(err, data) {
    if (err) {
      return callback(err);
    }

    return zlib.gunzip(data, function(err, content) {
      var result = {};

      if (err) {
        return callback(err);
      }

      try {
        result = JSON.parse(content);
      } catch (e) {
        return callback(e);
      }

      return callback(null, result);
    });
  });
};

/**
 * Write contents into a compressed file.
 *
 * @async
 * @params {String} filename
 * @params {String} result
 * @params {Function} callback
 */
var write = function(filename, result, callback) {
  var content = JSON.stringify(result);

  return zlib.gzip(content, function(err, data) {
    if (err) {
      return callback(err);
    }

    return fs.writeFile(filename, data, callback);
  });
};

/**
 * Build the filename for the cached file
 *
 * @params {String} source  File source code
 * @params {Object} options Options used
 *
 * @return {String}
 */
var filename = function(source, identifier, options) {
  var hash = crypto.createHash("SHA1");
  var contents = JSON.stringify({
    source: source,
    options: options,
    identifier: identifier
  });

  hash.end(contents);

  return hash.read().toString("hex") + ".json.gz";
};

/**
 * Handle the cache
 *
 * @params {String} directory
 * @params {Object} params
 * @params {Function} callback
 */
var handleCache = function(directory, params, callback) {
  var source = params.source;
  var options = params.options || {};
  var transform = params.transform;
  var identifier = params.identifier;
  var shouldFallback = typeof params.directory !== "string" &&
    directory !== os.tmpdir();

  // Make sure the directory exists.
  mkdirp(directory, function(err) {
    // Fallback to tmpdir if node_modules folder not writable
    if (err)
      return shouldFallback
        ? handleCache(os.tmpdir(), params, callback)
        : callback(err);

    var file = path.join(directory, filename(source, identifier, options));

    return read(file, function(err, content) {
      var result = {};
      // No errors mean that the file was previously cached
      // we just need to return it
      if (!err) return callback(null, content);

      // Otherwise just transform the file
      // return it to the user asap and write it in cache
      try {
        result = transform(source, options);
      } catch (error) {
        return callback(error);
      }

      return write(file, result, function(err) {
        // Fallback to tmpdir if node_modules folder not writable
        if (err)
          return shouldFallback
            ? handleCache(os.tmpdir(), params, callback)
            : callback(err);

        callback(null, result);
      });
    });
  });
};

/**
 * Retrieve file from cache, or create a new one for future reads
 *
 * @async
 * @param  {Object}   params
 * @param  {String}   params.directory  Directory to store cached files
 * @param  {String}   params.identifier Unique identifier to bust cache
 * @param  {String}   params.source   Original contents of the file to be cached
 * @param  {Object}   params.options  Options to be given to the transform fn
 * @param  {Function} params.transform  Function that will transform the
 *                                      original file and whose result will be
 *                                      cached
 *
 * @param  {Function<err, result>} callback
 *
 * @example
 *
 *   cache({
 *     directory: '.tmp/cache',
 *     identifier: 'babel-loader-cachefile',
 *     source: *source code from file*,
 *     options: {
 *       experimental: true,
 *       runtime: true
 *     },
 *     transform: function(source, options) {
 *       var content = *do what you need with the source*
 *       return content
 *     }
 *   }, function(err, result) {
 *
 *   })
 */

module.exports = function createFsCache(name) {
  return function(params, callback) {
    var directory;

    if (typeof params.directory === "string") {
      directory = params.directory;
    } else {
      if (defaultCacheDirectory === null) {
        defaultCacheDirectory = findCacheDir({
          name: name
        }) ||
          os.tmpdir();
      }
      directory = defaultCacheDirectory;
    }
    handleCache(directory, params, callback);
  };
};
