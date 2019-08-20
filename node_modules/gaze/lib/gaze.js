/*
 * gaze
 * https://github.com/shama/gaze
 *
 * Copyright (c) 2018 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

// libs
var util = require('util');
var EE = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');
var globule = require('globule');
var helper = require('./helper');

// shim setImmediate for node v0.8
var setImmediate = require('timers').setImmediate;
if (typeof setImmediate !== 'function') {
  setImmediate = process.nextTick;
}

// globals
var delay = 10;

// `Gaze` EventEmitter object to return in the callback
function Gaze (patterns, opts, done) {
  var self = this;
  EE.call(self);

  // If second arg is the callback
  if (typeof opts === 'function') {
    done = opts;
    opts = {};
  }

  // Default options
  opts = opts || {};
  opts.mark = true;
  opts.interval = opts.interval || 100;
  opts.debounceDelay = opts.debounceDelay || 500;
  opts.cwd = opts.cwd || process.cwd();
  this.options = opts;

  // Default done callback
  done = done || function () {};

  // Remember our watched dir:files
  this._watched = Object.create(null);

  // Store watchers
  this._watchers = Object.create(null);

  // Store watchFile listeners
  this._pollers = Object.create(null);

  // Store patterns
  this._patterns = [];

  // Cached events for debouncing
  this._cached = Object.create(null);

  // Set maxListeners
  if (this.options.maxListeners != null) {
    this.setMaxListeners(this.options.maxListeners);
    Gaze.super_.prototype.setMaxListeners(this.options.maxListeners);
    delete this.options.maxListeners;
  }

  // Initialize the watch on files
  if (patterns) {
    this.add(patterns, done);
  }

  // keep the process alive
  this._keepalive = setInterval(function () {}, 200);

  return this;
}
util.inherits(Gaze, EE);

// Main entry point. Start watching and call done when setup
module.exports = function gaze (patterns, opts, done) {
  return new Gaze(patterns, opts, done);
};
module.exports.Gaze = Gaze;

// Override the emit function to emit `all` events
// and debounce on duplicate events per file
Gaze.prototype.emit = function () {
  var self = this;
  var args = arguments;

  var e = args[0];
  var filepath = args[1];
  var timeoutId;

  // If not added/deleted/changed/renamed then just emit the event
  if (e.slice(-2) !== 'ed') {
    Gaze.super_.prototype.emit.apply(self, args);
    return this;
  }

  // Detect rename event, if added and previous deleted is in the cache
  if (e === 'added') {
    Object.keys(this._cached).forEach(function (oldFile) {
      if (self._cached[oldFile].indexOf('deleted') !== -1) {
        args[0] = e = 'renamed';
        [].push.call(args, oldFile);
        delete self._cached[oldFile];
        return false;
      }
    });
  }

  // If cached doesnt exist, create a delay before running the next
  // then emit the event
  var cache = this._cached[filepath] || [];
  if (cache.indexOf(e) === -1) {
    helper.objectPush(self._cached, filepath, e);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      delete self._cached[filepath];
    }, this.options.debounceDelay);
    // Emit the event and `all` event
    Gaze.super_.prototype.emit.apply(self, args);
    Gaze.super_.prototype.emit.apply(self, ['all', e].concat([].slice.call(args, 1)));
  }

  // Detect if new folder added to trigger for matching files within folder
  if (e === 'added') {
    if (helper.isDir(filepath)) {
      // It's possible that between `isDir` and `readdirSync()` calls the `filepath`
      // gets removed, which will result in `ENOENT` exception

      var files;

      try {
        files = fs.readdirSync(filepath);
      } catch (e) {
        // Rethrow the error if it's anything other than `ENOENT`
        if (e.code !== 'ENOENT') {
          throw e;
        }

        files = [];
      }

      files.map(function (file) {
        return path.join(filepath, file);
      }).filter(function (file) {
        return globule.isMatch(self._patterns, file, self.options);
      }).forEach(function (file) {
        self.emit('added', file);
      });
    }
  }

  return this;
};

// Close watchers
Gaze.prototype.close = function (_reset) {
  var self = this;
  Object.keys(self._watchers).forEach(function (file) {
    self._watchers[file].close();
  });
  self._watchers = Object.create(null);
  Object.keys(this._watched).forEach(function (dir) {
    self._unpollDir(dir);
  });
  if (_reset !== false) {
    self._watched = Object.create(null);
    setTimeout(function () {
      self.emit('end');
      self.removeAllListeners();
      clearInterval(self._keepalive);
    }, delay + 100);
  }
  return self;
};

// Add file patterns to be watched
Gaze.prototype.add = function (files, done) {
  if (typeof files === 'string') { files = [files]; }
  this._patterns = helper.unique.apply(null, [this._patterns, files]);
  files = globule.find(this._patterns, this.options);
  this._addToWatched(files);
  this.close(false);
  this._initWatched(done);
};

// Dont increment patterns and dont call done if nothing added
Gaze.prototype._internalAdd = function (file, done) {
  var files = [];
  if (helper.isDir(file)) {
    files = [helper.markDir(file)].concat(globule.find(this._patterns, this.options));
  } else {
    if (globule.isMatch(this._patterns, file, this.options)) {
      files = [file];
    }
  }
  if (files.length > 0) {
    this._addToWatched(files);
    this.close(false);
    this._initWatched(done);
  }
};

// Remove file/dir from `watched`
Gaze.prototype.remove = function (file) {
  var self = this;
  if (this._watched[file]) {
    // is dir, remove all files
    this._unpollDir(file);
    delete this._watched[file];
  } else {
    // is a file, find and remove
    Object.keys(this._watched).forEach(function (dir) {
      var index = self._watched[dir].indexOf(file);
      if (index !== -1) {
        self._unpollFile(file);
        self._watched[dir].splice(index, 1);
        return false;
      }
    });
  }
  if (this._watchers[file]) {
    this._watchers[file].close();
  }
  return this;
};

// Return watched files
Gaze.prototype.watched = function () {
  return this._watched;
};

// Returns `watched` files with relative paths to process.cwd()
Gaze.prototype.relative = function (dir, unixify) {
  var self = this;
  var relative = Object.create(null);
  var relDir, relFile, unixRelDir;
  var cwd = this.options.cwd || process.cwd();
  if (dir === '') { dir = '.'; }
  dir = helper.markDir(dir);
  unixify = unixify || false;
  Object.keys(this._watched).forEach(function (dir) {
    relDir = path.relative(cwd, dir) + path.sep;
    if (relDir === path.sep) { relDir = '.'; }
    unixRelDir = unixify ? helper.unixifyPathSep(relDir) : relDir;
    relative[unixRelDir] = self._watched[dir].map(function (file) {
      relFile = path.relative(path.join(cwd, relDir) || '', file || '');
      if (helper.isDir(file)) {
        relFile = helper.markDir(relFile);
      }
      if (unixify) {
        relFile = helper.unixifyPathSep(relFile);
      }
      return relFile;
    });
  });
  if (dir && unixify) {
    dir = helper.unixifyPathSep(dir);
  }
  return dir ? relative[dir] || [] : relative;
};

// Adds files and dirs to watched
Gaze.prototype._addToWatched = function (files) {
  var dirs = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filepath = path.resolve(this.options.cwd, file);

    var dirname = (helper.isDir(file)) ? filepath : path.dirname(filepath);
    dirname = helper.markDir(dirname);

    // If a new dir is added
    if (helper.isDir(file) && !(dirname in this._watched)) {
      helper.objectPush(this._watched, dirname, []);
    }

    if (file.slice(-1) === '/') { filepath += path.sep; }
    helper.objectPush(this._watched, path.dirname(filepath) + path.sep, filepath);

    dirs.push(dirname);
  }

  dirs = helper.unique(dirs);

  for (var k = 0; k < dirs.length; k++) {
    dirname = dirs[k];
    // add folders into the mix
    var readdir = fs.readdirSync(dirname);
    for (var j = 0; j < readdir.length; j++) {
      var dirfile = path.join(dirname, readdir[j]);
      if (fs.lstatSync(dirfile).isDirectory()) {
        helper.objectPush(this._watched, dirname, dirfile + path.sep);
      }
    }
  }

  return this;
};

Gaze.prototype._watchDir = function (dir, done) {
  var self = this;
  var timeoutId;
  try {
    this._watchers[dir] = fs.watch(dir, function (event) {
      // race condition. Let's give the fs a little time to settle down. so we
      // don't fire events on non existent files.
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        // race condition. Ensure that this directory is still being watched
        // before continuing.
        if ((dir in self._watchers) && fs.existsSync(dir)) {
          done(null, dir);
        }
      }, delay + 100);
    });

    this._watchers[dir].on('error', function (err) {
      self._handleError(err);
    });
  } catch (err) {
    return this._handleError(err);
  }
  return this;
};

Gaze.prototype._unpollFile = function (file) {
  if (this._pollers[file]) {
    fs.unwatchFile(file, this._pollers[file]);
    delete this._pollers[file];
  }
  return this;
};

Gaze.prototype._unpollDir = function (dir) {
  this._unpollFile(dir);
  for (var i = 0; i < this._watched[dir].length; i++) {
    this._unpollFile(this._watched[dir][i]);
  }
};

Gaze.prototype._pollFile = function (file, done) {
  var opts = { persistent: true, interval: this.options.interval };
  if (!this._pollers[file]) {
    this._pollers[file] = function (curr, prev) {
      done(null, file);
    };
    try {
      fs.watchFile(file, opts, this._pollers[file]);
    } catch (err) {
      return this._handleError(err);
    }
  }
  return this;
};

// Initialize the actual watch on `watched` files
Gaze.prototype._initWatched = function (done) {
  var self = this;
  var cwd = this.options.cwd || process.cwd();
  var curWatched = Object.keys(self._watched);

  // if no matching files
  if (curWatched.length < 1) {
    // Defer to emitting to give a chance to attach event handlers.
    setImmediate(function () {
      self.emit('ready', self);
      if (done) { done.call(self, null, self); }
      self.emit('nomatch');
    });
    return;
  }

  helper.forEachSeries(curWatched, function (dir, next) {
    dir = dir || '';
    var files = self._watched[dir];
    // Triggered when a watched dir has an event
    self._watchDir(dir, function (event, dirpath) {
      var relDir = cwd === dir ? '.' : path.relative(cwd, dir);
      relDir = relDir || '';

      fs.readdir(dirpath, function (err, current) {
        if (err) { return self.emit('error', err); }
        if (!current) { return; }

        try {
          // append path.sep to directories so they match previous.
          current = current.map(function (curPath) {
            if (fs.existsSync(path.join(dir, curPath)) && fs.lstatSync(path.join(dir, curPath)).isDirectory()) {
              return curPath + path.sep;
            } else {
              return curPath;
            }
          });
        } catch (err) {
          // race condition-- sometimes the file no longer exists
        }

        // Get watched files for this dir
        var previous = self.relative(relDir);

        // If file was deleted
        previous.filter(function (file) {
          return current.indexOf(file) < 0;
        }).forEach(function (file) {
          if (!helper.isDir(file)) {
            var filepath = path.join(dir, file);
            self.remove(filepath);
            self.emit('deleted', filepath);
          }
        });

        // If file was added
        current.filter(function (file) {
          return previous.indexOf(file) < 0;
        }).forEach(function (file) {
          // Is it a matching pattern?
          var relFile = path.join(relDir, file);
          // Add to watch then emit event
          self._internalAdd(relFile, function () {
            self.emit('added', path.join(dir, file));
          });
        });
      });
    });

    // Watch for change/rename events on files
    files.forEach(function (file) {
      if (helper.isDir(file)) { return; }
      self._pollFile(file, function (err, filepath) {
        if (err) {
          self.emit('error', err);
          return;
        }
        // Only emit changed if the file still exists
        // Prevents changed/deleted duplicate events
        if (fs.existsSync(filepath)) {
          self.emit('changed', filepath);
        }
      });
    });

    next();
  }, function () {
    // Return this instance of Gaze
    // delay before ready solves a lot of issues
    setTimeout(function () {
      self.emit('ready', self);
      if (done) { done.call(self, null, self); }
    }, delay + 100);
  });
};

// If an error, handle it here
Gaze.prototype._handleError = function (err) {
  if (err.code === 'EMFILE') {
    return this.emit('error', new Error('EMFILE: Too many opened files.'));
  }
  return this.emit('error', err);
};
