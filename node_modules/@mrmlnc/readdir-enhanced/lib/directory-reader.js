'use strict';

const Readable = require('stream').Readable;
const EventEmitter = require('events').EventEmitter;
const path = require('path');
const normalizeOptions = require('./normalize-options');
const stat = require('./stat');
const call = require('./call');

/**
 * Asynchronously reads the contents of a directory and streams the results
 * via a {@link stream.Readable}.
 */
class DirectoryReader {
  /**
   * @param {string} dir - The absolute or relative directory path to read
   * @param {object} [options] - User-specified options, if any (see {@link normalizeOptions})
   * @param {object} internalOptions - Internal options that aren't part of the public API
   * @class
   */
  constructor (dir, options, internalOptions) {
    this.options = options = normalizeOptions(options, internalOptions);

    // Indicates whether we should keep reading
    // This is set false if stream.Readable.push() returns false.
    this.shouldRead = true;

    // The directories to read
    // (initialized with the top-level directory)
    this.queue = [{
      path: dir,
      basePath: options.basePath,
      posixBasePath: options.posixBasePath,
      depth: 0
    }];

    // The number of directories that are currently being processed
    this.pending = 0;

    // The data that has been read, but not yet emitted
    this.buffer = [];

    this.stream = new Readable({ objectMode: true });
    this.stream._read = () => {
      // Start (or resume) reading
      this.shouldRead = true;

      // If we have data in the buffer, then send the next chunk
      if (this.buffer.length > 0) {
        this.pushFromBuffer();
      }

      // If we have directories queued, then start processing the next one
      if (this.queue.length > 0) {
        if (this.options.facade.sync) {
          while (this.queue.length > 0) {
            this.readNextDirectory();
          }
        }
        else {
          this.readNextDirectory();
        }
      }

      this.checkForEOF();
    };
  }

  /**
   * Reads the next directory in the queue
   */
  readNextDirectory () {
    let facade = this.options.facade;
    let dir = this.queue.shift();
    this.pending++;

    // Read the directory listing
    call.safe(facade.fs.readdir, dir.path, (err, items) => {
      if (err) {
        // fs.readdir threw an error
        this.emit('error', err);
        return this.finishedReadingDirectory();
      }

      try {
        // Process each item in the directory (simultaneously, if async)
        facade.forEach(
          items,
          this.processItem.bind(this, dir),
          this.finishedReadingDirectory.bind(this, dir)
        );
      }
      catch (err2) {
        // facade.forEach threw an error
        // (probably because fs.readdir returned an invalid result)
        this.emit('error', err2);
        this.finishedReadingDirectory();
      }
    });
  }

  /**
   * This method is called after all items in a directory have been processed.
   *
   * NOTE: This does not necessarily mean that the reader is finished, since there may still
   * be other directories queued or pending.
   */
  finishedReadingDirectory () {
    this.pending--;

    if (this.shouldRead) {
      // If we have directories queued, then start processing the next one
      if (this.queue.length > 0 && this.options.facade.async) {
        this.readNextDirectory();
      }

      this.checkForEOF();
    }
  }

  /**
   * Determines whether the reader has finished processing all items in all directories.
   * If so, then the "end" event is fired (via {@Readable#push})
   */
  checkForEOF () {
    if (this.buffer.length === 0 &&   // The stuff we've already read
    this.pending === 0 &&             // The stuff we're currently reading
    this.queue.length === 0) {        // The stuff we haven't read yet
      // There's no more stuff!
      this.stream.push(null);
    }
  }

  /**
   * Processes a single item in a directory.
   *
   * If the item is a directory, and `option.deep` is enabled, then the item will be added
   * to the directory queue.
   *
   * If the item meets the filter criteria, then it will be emitted to the reader's stream.
   *
   * @param {object} dir - A directory object from the queue
   * @param {string} item - The name of the item (name only, no path)
   * @param {function} done - A callback function that is called after the item has been processed
   */
  processItem (dir, item, done) {
    let stream = this.stream;
    let options = this.options;

    let itemPath = dir.basePath + item;
    let posixPath = dir.posixBasePath + item;
    let fullPath = path.join(dir.path, item);

    // If `options.deep` is a number, and we've already recursed to the max depth,
    // then there's no need to check fs.Stats to know if it's a directory.
    // If `options.deep` is a function, then we'll need fs.Stats
    let maxDepthReached = dir.depth >= options.recurseDepth;

    // Do we need to call `fs.stat`?
    let needStats =
      !maxDepthReached ||                                 // we need the fs.Stats to know if it's a directory
      options.stats ||                                    // the user wants fs.Stats objects returned
      options.recurseFn ||                                // we need fs.Stats for the recurse function
      options.filterFn ||                                 // we need fs.Stats for the filter function
      EventEmitter.listenerCount(stream, 'file') ||       // we need the fs.Stats to know if it's a file
      EventEmitter.listenerCount(stream, 'directory') ||  // we need the fs.Stats to know if it's a directory
      EventEmitter.listenerCount(stream, 'symlink');      // we need the fs.Stats to know if it's a symlink

    // If we don't need stats, then exit early
    if (!needStats) {
      if (this.filter(itemPath, posixPath)) {
        this.pushOrBuffer({ data: itemPath });
      }
      return done();
    }

    // Get the fs.Stats object for this path
    stat(options.facade.fs, fullPath, (err, stats) => {
      if (err) {
        // fs.stat threw an error
        this.emit('error', err);
        return done();
      }

      try {
        // Add the item's path to the fs.Stats object
        // The base of this path, and its separators are determined by the options
        // (i.e. options.basePath and options.sep)
        stats.path = itemPath;

        // Add depth of the path to the fs.Stats object for use this in the filter function
        stats.depth = dir.depth;

        if (this.shouldRecurse(stats, posixPath, maxDepthReached)) {
          // Add this subdirectory to the queue
          this.queue.push({
            path: fullPath,
            basePath: itemPath + options.sep,
            posixBasePath: posixPath + '/',
            depth: dir.depth + 1,
          });
        }

        // Determine whether this item matches the filter criteria
        if (this.filter(stats, posixPath)) {
          this.pushOrBuffer({
            data: options.stats ? stats : itemPath,
            file: stats.isFile(),
            directory: stats.isDirectory(),
            symlink: stats.isSymbolicLink(),
          });
        }

        done();
      }
      catch (err2) {
        // An error occurred while processing the item
        // (probably during a user-specified function, such as options.deep, options.filter, etc.)
        this.emit('error', err2);
        done();
      }
    });
  }

  /**
   * Pushes the given chunk of data to the stream, or adds it to the buffer,
   * depending on the state of the stream.
   *
   * @param {object} chunk
   */
  pushOrBuffer (chunk) {
    // Add the chunk to the buffer
    this.buffer.push(chunk);

    // If we're still reading, then immediately emit the next chunk in the buffer
    // (which may or may not be the chunk that we just added)
    if (this.shouldRead) {
      this.pushFromBuffer();
    }
  }

  /**
   * Immediately pushes the next chunk in the buffer to the reader's stream.
   * The "data" event will always be fired (via {@link Readable#push}).
   * In addition, the "file", "directory", and/or "symlink" events may be fired,
   * depending on the type of properties of the chunk.
   */
  pushFromBuffer () {
    let stream = this.stream;
    let chunk = this.buffer.shift();

    // Stream the data
    try {
      this.shouldRead = stream.push(chunk.data);
    }
    catch (err) {
      this.emit('error', err);
    }

    // Also emit specific events, based on the type of chunk
    chunk.file && this.emit('file', chunk.data);
    chunk.symlink && this.emit('symlink', chunk.data);
    chunk.directory && this.emit('directory', chunk.data);
  }

  /**
   * Determines whether the given directory meets the user-specified recursion criteria.
   * If the user didn't specify recursion criteria, then this function will default to true.
   *
   * @param {fs.Stats} stats - The directory's {@link fs.Stats} object
   * @param {string} posixPath - The item's POSIX path (used for glob matching)
   * @param {boolean} maxDepthReached - Whether we've already crawled the user-specified depth
   * @returns {boolean}
   */
  shouldRecurse (stats, posixPath, maxDepthReached) {
    let options = this.options;

    if (maxDepthReached) {
      // We've already crawled to the maximum depth. So no more recursion.
      return false;
    }
    else if (!stats.isDirectory()) {
      // It's not a directory. So don't try to crawl it.
      return false;
    }
    else if (options.recurseGlob) {
      // Glob patterns are always tested against the POSIX path, even on Windows
      // https://github.com/isaacs/node-glob#windows
      return options.recurseGlob.test(posixPath);
    }
    else if (options.recurseRegExp) {
      // Regular expressions are tested against the normal path
      // (based on the OS or options.sep)
      return options.recurseRegExp.test(stats.path);
    }
    else if (options.recurseFn) {
      try {
        // Run the user-specified recursion criteria
        return options.recurseFn.call(null, stats);
      }
      catch (err) {
        // An error occurred in the user's code.
        // In Sync and Async modes, this will return an error.
        // In Streaming mode, we emit an "error" event, but continue processing
        this.emit('error', err);
      }
    }
    else {
      // No recursion function was specified, and we're within the maximum depth.
      // So crawl this directory.
      return true;
    }
  }

  /**
   * Determines whether the given item meets the user-specified filter criteria.
   * If the user didn't specify a filter, then this function will always return true.
   *
   * @param {string|fs.Stats} value - Either the item's path, or the item's {@link fs.Stats} object
   * @param {string} posixPath - The item's POSIX path (used for glob matching)
   * @returns {boolean}
   */
  filter (value, posixPath) {
    let options = this.options;

    if (options.filterGlob) {
      // Glob patterns are always tested against the POSIX path, even on Windows
      // https://github.com/isaacs/node-glob#windows
      return options.filterGlob.test(posixPath);
    }
    else if (options.filterRegExp) {
      // Regular expressions are tested against the normal path
      // (based on the OS or options.sep)
      return options.filterRegExp.test(value.path || value);
    }
    else if (options.filterFn) {
      try {
        // Run the user-specified filter function
        return options.filterFn.call(null, value);
      }
      catch (err) {
        // An error occurred in the user's code.
        // In Sync and Async modes, this will return an error.
        // In Streaming mode, we emit an "error" event, but continue processing
        this.emit('error', err);
      }
    }
    else {
      // No filter was specified, so match everything
      return true;
    }
  }

  /**
   * Emits an event.  If one of the event listeners throws an error,
   * then an "error" event is emitted.
   *
   * @param {string} eventName
   * @param {*} data
   */
  emit (eventName, data) {
    let stream = this.stream;

    try {
      stream.emit(eventName, data);
    }
    catch (err) {
      if (eventName === 'error') {
        // Don't recursively emit "error" events.
        // If the first one fails, then just throw
        throw err;
      }
      else {
        stream.emit('error', err);
      }
    }
  }
}

module.exports = DirectoryReader;
