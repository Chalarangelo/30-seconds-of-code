/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

var watcherManager = require("./watcherManager");
var EventEmitter = require("events").EventEmitter;

function Watchpack(options) {
	EventEmitter.call(this);
	if(!options) options = {};
	if(!options.aggregateTimeout) options.aggregateTimeout = 200;
	this.options = options;
	this.watcherOptions = {
		ignored: options.ignored,
		poll: options.poll
	};
	this.fileWatchers = [];
	this.dirWatchers = [];
	this.mtimes = Object.create(null);
	this.paused = false;
	this.aggregatedChanges = [];
	this.aggregatedRemovals = [];
	this.aggregateTimeout = 0;
	this._onTimeout = this._onTimeout.bind(this);
}

module.exports = Watchpack;

Watchpack.prototype = Object.create(EventEmitter.prototype);

Watchpack.prototype.watch = function watch(files, directories, startTime) {
	this.paused = false;
	var oldFileWatchers = this.fileWatchers;
	var oldDirWatchers = this.dirWatchers;
	this.fileWatchers = files.map(function(file) {
		return this._fileWatcher(file, watcherManager.watchFile(file, this.watcherOptions, startTime));
	}, this);
	this.dirWatchers = directories.map(function(dir) {
		return this._dirWatcher(dir, watcherManager.watchDirectory(dir, this.watcherOptions, startTime));
	}, this);
	oldFileWatchers.forEach(function(w) {
		w.close();
	}, this);
	oldDirWatchers.forEach(function(w) {
		w.close();
	}, this);
};

Watchpack.prototype.close = function resume() {
	this.paused = true;
	if(this.aggregateTimeout)
		clearTimeout(this.aggregateTimeout);
	this.fileWatchers.forEach(function(w) {
		w.close();
	}, this);
	this.dirWatchers.forEach(function(w) {
		w.close();
	}, this);
	this.fileWatchers.length = 0;
	this.dirWatchers.length = 0;
};

Watchpack.prototype.pause = function pause() {
	this.paused = true;
	if(this.aggregateTimeout)
		clearTimeout(this.aggregateTimeout);
};

function addWatchersToArray(watchers, array) {
	watchers.forEach(function(w) {
		if(array.indexOf(w.directoryWatcher) < 0) {
			array.push(w.directoryWatcher);
			addWatchersToArray(Object.keys(w.directoryWatcher.directories).reduce(function(a, dir) {
				if(w.directoryWatcher.directories[dir] !== true)
					a.push(w.directoryWatcher.directories[dir]);
				return a;
			}, []), array);
		}
	});
}

Watchpack.prototype.getTimes = function() {
	var directoryWatchers = [];
	addWatchersToArray(this.fileWatchers.concat(this.dirWatchers), directoryWatchers);
	var obj = Object.create(null);
	directoryWatchers.forEach(function(w) {
		var times = w.getTimes();
		Object.keys(times).forEach(function(file) {
			obj[file] = times[file];
		});
	});
	return obj;
};

Watchpack.prototype._fileWatcher = function _fileWatcher(file, watcher) {
	watcher.on("change", function(mtime, type) {
		this._onChange(file, mtime, file, type);
	}.bind(this));
	watcher.on("remove", function(type) {
		this._onRemove(file, file, type);
	}.bind(this));
	return watcher;
};

Watchpack.prototype._dirWatcher = function _dirWatcher(item, watcher) {
	watcher.on("change", function(file, mtime, type) {
		this._onChange(item, mtime, file, type);
	}.bind(this));
	return watcher;
};

Watchpack.prototype._onChange = function _onChange(item, mtime, file) {
	file = file || item;
	this.mtimes[file] = mtime;
	if(this.paused) return;
	this.emit("change", file, mtime);
	if(this.aggregateTimeout)
		clearTimeout(this.aggregateTimeout);
	if(this.aggregatedChanges.indexOf(item) < 0)
		this.aggregatedChanges.push(item);
	this.aggregateTimeout = setTimeout(this._onTimeout, this.options.aggregateTimeout);
};

Watchpack.prototype._onRemove = function _onRemove(item, file) {
	file = file || item;
	delete this.mtimes[item];
	if(this.paused) return;
	this.emit("remove", item);
	if(this.aggregateTimeout)
		clearTimeout(this.aggregateTimeout);
	if(this.aggregatedRemovals.indexOf(item) < 0)
		this.aggregatedRemovals.push(item);
	this.aggregateTimeout = setTimeout(this._onTimeout, this.options.aggregateTimeout);
};

Watchpack.prototype._onTimeout = function _onTimeout() {
	this.aggregateTimeout = 0;
	var changes = this.aggregatedChanges;
	var removals = this.aggregatedRemovals;
	this.aggregatedChanges = [];
	this.aggregatedRemovals = [];
	this.emit("aggregated", changes, removals);
};
