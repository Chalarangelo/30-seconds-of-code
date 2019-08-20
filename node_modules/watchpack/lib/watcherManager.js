/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

var path = require("path");

function WatcherManager() {
	this.directoryWatchers = {};
}

WatcherManager.prototype.getDirectoryWatcher = function(directory, options) {
	var DirectoryWatcher = require("./DirectoryWatcher");
	options = options || {};
	var key = directory + " " + JSON.stringify(options);
	if(!this.directoryWatchers[key]) {
		this.directoryWatchers[key] = new DirectoryWatcher(directory, options);
		this.directoryWatchers[key].on("closed", function() {
			delete this.directoryWatchers[key];
		}.bind(this));
	}
	return this.directoryWatchers[key];
};

WatcherManager.prototype.watchFile = function watchFile(p, options, startTime) {
	var directory = path.dirname(p);
	return this.getDirectoryWatcher(directory, options).watch(p, startTime);
};

WatcherManager.prototype.watchDirectory = function watchDirectory(directory, options, startTime) {
	return this.getDirectoryWatcher(directory, options).watch(directory, startTime);
};

module.exports = new WatcherManager();
