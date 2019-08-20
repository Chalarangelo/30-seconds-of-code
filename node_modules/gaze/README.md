# gaze [![Build Status](http://img.shields.io/travis/shama/gaze.svg)](https://travis-ci.org/shama/gaze) [![Build status](https://ci.appveyor.com/api/projects/status/vtx65w9eg511tgo4)](https://ci.appveyor.com/project/shama/gaze)

A globbing `fs.watch` wrapper built from the best parts of other fine watch libs.  
Compatible with Node.js >= 4.x, Windows, macOS, and Linux.

![gaze](http://dontkry.com/images/repos/gaze.png)

[![NPM](https://nodei.co/npm/gaze.png?downloads=true)](https://nodei.co/npm/gaze/)

## Usage
Install the module with: `npm install gaze` or place into your `package.json`
and run `npm install`.

```javascript
var gaze = require('gaze');

// Watch all .js files/dirs in process.cwd()
gaze('**/*.js', function(err, watcher) {
  // Files have all started watching
  // watcher === this

  // Get all watched files
  var watched = this.watched();

  // On file changed
  this.on('changed', function(filepath) {
    console.log(filepath + ' was changed');
  });

  // On file added
  this.on('added', function(filepath) {
    console.log(filepath + ' was added');
  });

  // On file deleted
  this.on('deleted', function(filepath) {
    console.log(filepath + ' was deleted');
  });

  // On changed/added/deleted
  this.on('all', function(event, filepath) {
    console.log(filepath + ' was ' + event);
  });

  // Get watched files with relative paths
  var files = this.relative();
});

// Also accepts an array of patterns
gaze(['stylesheets/*.css', 'images/**/*.png'], function() {
  // Add more patterns later to be watched
  this.add(['js/*.js']);
});
```

### Alternate Interface

```javascript
var Gaze = require('gaze').Gaze;

var gaze = new Gaze('**/*');

// Files have all started watching
gaze.on('ready', function(watcher) { });

// A file has been added/changed/deleted has occurred
gaze.on('all', function(event, filepath) { });
```

### Errors

```javascript
gaze('**/*', function(error, watcher) {
  if (error) {
    // Handle error if it occurred while starting up
  }
});

// Or with the alternative interface
var gaze = new Gaze();
gaze.on('error', function(error) {
  // Handle error here
});
gaze.add('**/*');
```

### Minimatch / Glob

See [isaacs's `minimatch`](https://github.com/isaacs/minimatch) for more
information on glob patterns.

## Documentation

### gaze([patterns, options, callback])

* `patterns` {`String`|`Array`} File patterns to be matched
* `options` {`Object`}
* `callback` {`Function`}
  * `err` {`Error` | `null`}
  * `watcher` {`Object`} Instance of the `Gaze` watcher

### Class: `gaze.Gaze`

Create a `Gaze` object by instancing the `gaze.Gaze` class.

```javascript
var Gaze = require('gaze').Gaze;
var gaze = new Gaze(pattern, options, callback);
```

#### Properties

* `options` The options object passed in.
  * `interval` {integer} Interval to pass to `fs.watchFile`
  * `debounceDelay` {integer} Delay for events called in succession for the same
    file/event in milliseconds
  * `mode` {string} Force the watch mode. Either `'auto'` (default), `'watch'` (force native events), or `'poll'` (force stat polling).
  * `cwd` {string} The current working directory to base file patterns from. Default is `process.cwd()`.

#### Events

* `ready(watcher)` When files have been globbed and watching has begun.
* `all(event, filepath)` When an `added`, `changed`, `renamed`, or `deleted` event occurs.
* `added(filepath)` When a file has been added to a watch directory.
* `changed(filepath)` When a file has been changed.
* `deleted(filepath)` When a file has been deleted.
* `renamed(newPath, oldPath)` When a file has been renamed.
* `end()` When the watcher is closed and watches have been removed.
* `error(err)` When an error occurs.
* `nomatch` When no files have been matched.

#### Methods

* `emit(event, [...])` Wrapper for `EventEmitter.emit`.
  `added`|`changed`|`renamed`|`deleted` events will also trigger the `all` event.
* `close()` Unwatch all files and reset the watch instance.
* `add(patterns, callback)` Adds file(s) `patterns` to be watched.
* `remove(filepath)` Removes a file or directory from being watched. Does not
  recurse directories.
* `watched()` Returns the currently watched files.
* `relative([dir, unixify])` Returns the currently watched files with relative paths.
  * `dir` {string} Only return relative files for this directory.
  * `unixify` {boolean} Return paths with `/` instead of `\\` if on Windows.

## Similar Projects

Other great watch libraries to try are:

* [paulmillr's `chokidar`](https://github.com/paulmillr/chokidar)
* [amasad's `sane`](https://github.com/amasad/sane)
* [mikeal's `watch`](https://github.com/mikeal/watch)
* [github's `pathwatcher`](https://github.com/atom/node-pathwatcher)
* [bevry's `watchr`](https://github.com/bevry/watchr)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## Release History
* 1.1.3 - Fix for Node 10 support (@aredridel). Officially dropping support for Node < 4.
* 1.1.2 - Prevent more `ENOENT` errors from escaping (@alexgorbatchev).
* 1.1.1 - Prevent `fs.watch` errors from escaping error handler (@rosen-vladimirov). Fix `_addToWatched` without `path.sep` (@wyicwx).
* 1.1.0 - Update to `globule@1.0.0` with `minimatch >= 3.0.0`.
* 1.0.0 - Revert back to 0.5.2. Drop support for Node.js v0.8. Fix for `maxListeners`. Update `globule` to `0.2.0`.
* 0.6.4 - Catch and emit `error` from `readdir` (@oconnore). Fix for `0 maxListeners`. Use `graceful-fs` to avoid `EMFILE` errors in other places `fs` is used. Better method to determine if `pathwatcher` was built. Fix keeping process alive too much, only init `pathwatcher` if a file is being watched. Set min required to Windows Vista when building on Windows (@pvolok).
* 0.6.3 - Add support for Node.js v0.11
* 0.6.2 - Fix argument error with `watched()`. Fix for erroneous `added` events on folders. Ignore `msvs` build error 4244.
* 0.6.1 - Fix for absolute paths.
* 0.6.0 - Uses native OS events (fork of `pathwatcher`) but can fall back to stat polling. Everything is async to avoid blocking, including `relative()` and `watched()`. Better error handling. Update to `globule@0.2.0`. No longer watches `cwd` by default. Added `mode` option. Better `EMFILE` message. Avoids `ENOENT` errors with symlinks. All constructor arguments are optional.
* 0.5.2 - Fix for `ENOENT` error with non-existent symlinks [BACKPORTED].
* 0.5.1 - Use `setImmediate` (`process.nextTick` for Node.js v0.8) to defer `ready`/`nomatch` events (@amasad).
* 0.5.0 - Process is now kept alive while watching files. Emits a `nomatch` event when no files are matching.
* 0.4.3 - Track file additions in newly created folders (@brett-shwom).
* 0.4.2 - Fix `.remove()` method to remove a single file in a directory (@kaelzhang). Fixing “`Cannot call method 'call' of undefined`” (@krasimir). Track new file additions within folders (@brett-shwom).
* 0.4.1 - Fix `watchDir` not respecting close in race condition (@chrisirhc).
* 0.4.0 - Drop support for Node.js v0.6. Use `globule` for file matching. Avoid Node.js v0.10 `path.resolve`/`join` errors. Register new files when added to non-existent folder. Multiple instances can now poll the same files (@jpommerening).
* 0.3.4 - Code clean up. Fix “`path must be strings`” errors (@groner). Fix incorrect `added` events (@groner).
* 0.3.3 - Fix for multiple patterns with negate.
* 0.3.2 - Emit `end` before `removeAllListeners`.
* 0.3.1 - Fix `added` events within subfolder patterns.
* 0.3.0 - Handle safewrite events, `forceWatchMethod` option removed, bug fixes and watch optimizations (@rgaskill).
* 0.2.2 - Fix issue where subsequent `add` calls dont get watched (@samcday). `removeAllListeners` on `close`.
* 0.2.1 - Fix issue with invalid `added` events in current working dir.
* 0.2.0 - Support and mark folders with `path.sep`. Add `forceWatchMethod` option. Support `renamed` events.
* 0.1.6 - Recognize the `cwd` option properly
* 0.1.5 - Catch “`too many open file`” errors
* 0.1.4 - Really fix the race condition with 2 watches
* 0.1.3 - Fix race condition with 2 watches
* 0.1.2 - Read triggering changed event fix
* 0.1.1 - Minor fixes
* 0.1.0 - Initial release

## License
Copyright (c) 2018 Kyle Robinson Young  
Licensed under the MIT license.
