# watchpack

Wrapper library for directory and file watching.

[![Build Status](https://travis-ci.org/webpack/watchpack.svg?branch=master)](https://travis-ci.org/webpack/watchpack) [![Build status](https://ci.appveyor.com/api/projects/status/e5u2qvmugtv0r647/branch/master?svg=true)](https://ci.appveyor.com/project/sokra/watchpack/branch/master) [![Test coverage][coveralls-image]][coveralls-url]

## Concept

watchpack high level API doesn't map directly to watchers. Instead a three level architecture ensures that for each directory only a single watcher exists.

* The high level API requests `DirectoryWatchers` from a `WatcherManager`, which ensures that only a single `DirectoryWatcher` per directory is created.
* A user-faced `Watcher` can be obtained from a `DirectoryWatcher` and provides a filtered view on the `DirectoryWatcher`.
* Reference-counting is used on the `DirectoryWatcher` and `Watcher` to decide when to close them.
* The real watchers (currently chokidar) are created by the `DirectoryWatcher`.
* Files are never watched directly. This should keep the watcher count low.
* Watching can be started in the past. This way watching can start after file reading.
* Symlinks are not followed, instead the symlink is watched.

## API

``` javascript
var Watchpack = require("watchpack");

var wp = new Watchpack({
	// options:
	aggregateTimeout: 1000
	// fire "aggregated" event when after a change for 1000ms no additional change occurred
	// aggregated defaults to undefined, which doesn't fire an "aggregated" event

	poll: true
	// poll: true - use polling with the default interval
	// poll: 10000 - use polling with an interval of 10s
	// poll defaults to undefined, which prefer native watching methods
	// Note: enable polling when watching on a network path

	ignored: /node_modules/,
	// anymatch-compatible definition of files/paths to be ignored
	// see https://github.com/paulmillr/chokidar#path-filtering
});

// Watchpack.prototype.watch(string[] files, string[] directories, [number startTime])
wp.watch(listOfFiles, listOfDirectories, Date.now() - 10000);
// starts watching these files and directories
// calling this again will override the files and directories

wp.on("change", function(filePath, mtime) {
	// filePath: the changed file
	// mtime: last modified time for the changed file
});

wp.on("aggregated", function(changes) {
	// changes: an array of all changed files
});

// Watchpack.prototype.pause()
wp.pause();
// stops emitting events, but keeps watchers open
// next "watch" call can reuse the watchers

// Watchpack.prototype.close()
wp.close();
// stops emitting events and closes all watchers

// Watchpack.prototype.getTimes()
var fileTimes = wp.getTimes();
// returns an object with all know change times for files
// this include timestamps from files not directly watched
// key: absolute path, value: timestamp as number
```

[coveralls-url]: https://coveralls.io/r/webpack/watchpack/
[coveralls-image]: https://img.shields.io/coveralls/webpack/watchpack.svg
