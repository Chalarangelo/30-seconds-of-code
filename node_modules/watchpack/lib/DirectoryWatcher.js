/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

var EventEmitter = require("events").EventEmitter;
var async = require("neo-async");
var chokidar = require("chokidar");
var fs = require("graceful-fs");
var path = require("path");

var watcherManager = require("./watcherManager");

var FS_ACCURACY = 1000;


function withoutCase(str) {
	return str.toLowerCase();
}


function Watcher(directoryWatcher, filePath, startTime) {
	EventEmitter.call(this);
	this.directoryWatcher = directoryWatcher;
	this.path = filePath;
	this.startTime = startTime && +startTime;
	// TODO this.data seem to be only read, weird
	this.data = 0;
}

Watcher.prototype = Object.create(EventEmitter.prototype);
Watcher.prototype.constructor = Watcher;

Watcher.prototype.checkStartTime = function checkStartTime(mtime, initial) {
	if(typeof this.startTime !== "number") return !initial;
	var startTime = this.startTime;
	return startTime <= mtime;
};

Watcher.prototype.close = function close() {
	this.emit("closed");
};


function DirectoryWatcher(directoryPath, options) {
	EventEmitter.call(this);
	this.options = options;
	this.path = directoryPath;
	this.files = Object.create(null);
	this.directories = Object.create(null);
	var interval = typeof options.poll === "number" ? options.poll : undefined;
	this.watcher = chokidar.watch(directoryPath, {
		ignoreInitial: true,
		persistent: true,
		followSymlinks: false,
		depth: 0,
		atomic: false,
		alwaysStat: true,
		ignorePermissionErrors: true,
		ignored: options.ignored,
		usePolling: options.poll ? true : undefined,
		interval: interval,
		binaryInterval: interval,
		disableGlobbing: true
	});
	this.watcher.on("add", this.onFileAdded.bind(this));
	this.watcher.on("addDir", this.onDirectoryAdded.bind(this));
	this.watcher.on("change", this.onChange.bind(this));
	this.watcher.on("unlink", this.onFileUnlinked.bind(this));
	this.watcher.on("unlinkDir", this.onDirectoryUnlinked.bind(this));
	this.watcher.on("error", this.onWatcherError.bind(this));
	this.initialScan = true;
	this.nestedWatching = false;
	this.initialScanRemoved = [];
	this.doInitialScan();
	this.watchers = Object.create(null);
	this.parentWatcher = null;
	this.refs = 0;
}
module.exports = DirectoryWatcher;

DirectoryWatcher.prototype = Object.create(EventEmitter.prototype);
DirectoryWatcher.prototype.constructor = DirectoryWatcher;

DirectoryWatcher.prototype.setFileTime = function setFileTime(filePath, mtime, initial, type) {
	var now = Date.now();
	var old = this.files[filePath];

	this.files[filePath] = [initial ? Math.min(now, mtime) : now, mtime];

	// we add the fs accuracy to reach the maximum possible mtime
	if(mtime)
		mtime = mtime + FS_ACCURACY;

	if(!old) {
		if(mtime) {
			if(this.watchers[withoutCase(filePath)]) {
				this.watchers[withoutCase(filePath)].forEach(function(w) {
					if(!initial || w.checkStartTime(mtime, initial)) {
						w.emit("change", mtime, initial ? "initial" : type);
					}
				});
			}
		}
	} else if(!initial && mtime) {
		if(this.watchers[withoutCase(filePath)]) {
			this.watchers[withoutCase(filePath)].forEach(function(w) {
				w.emit("change", mtime, type);
			});
		}
	} else if(!initial && !mtime) {
		if(this.watchers[withoutCase(filePath)]) {
			this.watchers[withoutCase(filePath)].forEach(function(w) {
				w.emit("remove", type);
			});
		}
	}
	if(this.watchers[withoutCase(this.path)]) {
		this.watchers[withoutCase(this.path)].forEach(function(w) {
			if(!initial || w.checkStartTime(mtime, initial)) {
				w.emit("change", filePath, mtime, initial ? "initial" : type);
			}
		});
	}
};

DirectoryWatcher.prototype.setDirectory = function setDirectory(directoryPath, exist, initial, type) {
	if(directoryPath === this.path) {
		if(!initial && this.watchers[withoutCase(this.path)]) {
			this.watchers[withoutCase(this.path)].forEach(function(w) {
				w.emit("change", directoryPath, w.data, initial ? "initial" : type);
			});
		}
	} else {
		var old = this.directories[directoryPath];
		if(!old) {
			if(exist) {
				if(this.nestedWatching) {
					this.createNestedWatcher(directoryPath);
				} else {
					this.directories[directoryPath] = true;
				}
				if(!initial && this.watchers[withoutCase(this.path)]) {
					this.watchers[withoutCase(this.path)].forEach(function(w) {
						w.emit("change", directoryPath, w.data, initial ? "initial" : type);
					});
				}
				if(this.watchers[withoutCase(directoryPath) + "#directory"]) {
					this.watchers[withoutCase(directoryPath) + "#directory"].forEach(function(w) {
						w.emit("change", w.data, initial ? "initial" : type);
					});
				}
			}
		} else {
			if(!exist) {
				if(this.nestedWatching)
					this.directories[directoryPath].close();
				delete this.directories[directoryPath];
				if(!initial && this.watchers[withoutCase(this.path)]) {
					this.watchers[withoutCase(this.path)].forEach(function(w) {
						w.emit("change", directoryPath, w.data, initial ? "initial" : type);
					});
				}
				if(this.watchers[withoutCase(directoryPath) + "#directory"]) {
					this.watchers[withoutCase(directoryPath) + "#directory"].forEach(function(w) {
						w.emit("change", directoryPath, w.data, initial ? "initial" : type);
					});
				}
			}
		}
	}
};

DirectoryWatcher.prototype.createNestedWatcher = function(directoryPath) {
	this.directories[directoryPath] = watcherManager.watchDirectory(directoryPath, this.options, 1);
	this.directories[directoryPath].on("change", function(filePath, mtime, type) {
		if(this.watchers[withoutCase(this.path)]) {
			this.watchers[withoutCase(this.path)].forEach(function(w) {
				if(w.checkStartTime(mtime, false)) {
					w.emit("change", filePath, mtime, type);
				}
			});
		}
	}.bind(this));
};

DirectoryWatcher.prototype.setNestedWatching = function(flag) {
	if(this.nestedWatching !== !!flag) {
		this.nestedWatching = !!flag;
		if(this.nestedWatching) {
			Object.keys(this.directories).forEach(function(directory) {
				this.createNestedWatcher(directory);
			}, this);
		} else {
			Object.keys(this.directories).forEach(function(directory) {
				this.directories[directory].close();
				this.directories[directory] = true;
			}, this);
		}
	}
};

DirectoryWatcher.prototype.watch = function watch(filePath, startTime) {
	this.watchers[withoutCase(filePath)] = this.watchers[withoutCase(filePath)] || [];
	this.refs++;
	var watcher = new Watcher(this, filePath, startTime);
	watcher.on("closed", function() {
		var idx = this.watchers[withoutCase(filePath)].indexOf(watcher);
		this.watchers[withoutCase(filePath)].splice(idx, 1);
		if(this.watchers[withoutCase(filePath)].length === 0) {
			delete this.watchers[withoutCase(filePath)];
			if(this.path === filePath)
				this.setNestedWatching(false);
		}
		if(--this.refs <= 0)
			this.close();
	}.bind(this));
	this.watchers[withoutCase(filePath)].push(watcher);
	var data;
	if(filePath === this.path) {
		this.setNestedWatching(true);
		data = false;
		Object.keys(this.files).forEach(function(file) {
			var d = this.files[file];
			if(!data)
				data = d;
			else
				data = [Math.max(data[0], d[0]), Math.max(data[1], d[1])];
		}, this);
	} else {
		data = this.files[filePath];
	}
	process.nextTick(function() {
		if(data) {
			var ts = data[0] === data[1] ? data[0] + FS_ACCURACY : data[0];
			if(ts >= startTime)
				watcher.emit("change", data[1]);
		} else if(this.initialScan && this.initialScanRemoved.indexOf(filePath) >= 0) {
			watcher.emit("remove");
		}
	}.bind(this));
	return watcher;
};

DirectoryWatcher.prototype.onFileAdded = function onFileAdded(filePath, stat) {
	if(filePath.indexOf(this.path) !== 0) return;
	if(/[\\\/]/.test(filePath.substr(this.path.length + 1))) return;

	this.setFileTime(filePath, +stat.mtime || +stat.ctime || 1, false, "add");
};

DirectoryWatcher.prototype.onDirectoryAdded = function onDirectoryAdded(directoryPath /*, stat */) {
	if(directoryPath.indexOf(this.path) !== 0) return;
	if(/[\\\/]/.test(directoryPath.substr(this.path.length + 1))) return;
	this.setDirectory(directoryPath, true, false, "add");
};

DirectoryWatcher.prototype.onChange = function onChange(filePath, stat) {
	if(filePath.indexOf(this.path) !== 0) return;
	if(/[\\\/]/.test(filePath.substr(this.path.length + 1))) return;
	var mtime = +stat.mtime || +stat.ctime || 1;
	ensureFsAccuracy(mtime);
	this.setFileTime(filePath, mtime, false, "change");
};

DirectoryWatcher.prototype.onFileUnlinked = function onFileUnlinked(filePath) {
	if(filePath.indexOf(this.path) !== 0) return;
	if(/[\\\/]/.test(filePath.substr(this.path.length + 1))) return;
	this.setFileTime(filePath, null, false, "unlink");
	if(this.initialScan) {
		this.initialScanRemoved.push(filePath);
	}
};

DirectoryWatcher.prototype.onDirectoryUnlinked = function onDirectoryUnlinked(directoryPath) {
	if(directoryPath.indexOf(this.path) !== 0) return;
	if(/[\\\/]/.test(directoryPath.substr(this.path.length + 1))) return;
	this.setDirectory(directoryPath, false, false, "unlink");
	if(this.initialScan) {
		this.initialScanRemoved.push(directoryPath);
	}
};

DirectoryWatcher.prototype.onWatcherError = function onWatcherError(/* err */) {
};

DirectoryWatcher.prototype.doInitialScan = function doInitialScan() {
	fs.readdir(this.path, function(err, items) {
		if(err) {
			this.parentWatcher = watcherManager.watchFile(this.path + "#directory", this.options, 1);
			this.parentWatcher.on("change", function(mtime, type) {
				if(this.watchers[withoutCase(this.path)]) {
					this.watchers[withoutCase(this.path)].forEach(function(w) {
						w.emit("change", this.path, mtime, type);
					}, this);
				}
			}.bind(this));
			this.initialScan = false;
			return;
		}
		async.forEach(items, function(item, callback) {
			var itemPath = path.join(this.path, item);
			fs.stat(itemPath, function(err2, stat) {
				if(!this.initialScan) return;
				if(err2) {
					callback();
					return;
				}
				if(stat.isFile()) {
					if(!this.files[itemPath])
						this.setFileTime(itemPath, +stat.mtime || +stat.ctime || 1, true);
				} else if(stat.isDirectory()) {
					if(!this.directories[itemPath])
						this.setDirectory(itemPath, true, true);
				}
				callback();
			}.bind(this));
		}.bind(this), function() {
			this.initialScan = false;
			this.initialScanRemoved = null;
		}.bind(this));
	}.bind(this));
};

DirectoryWatcher.prototype.getTimes = function() {
	var obj = Object.create(null);
	var selfTime = 0;
	Object.keys(this.files).forEach(function(file) {
		var data = this.files[file];
		var time;
		if(data[1]) {
			time = Math.max(data[0], data[1] + FS_ACCURACY);
		} else {
			time = data[0];
		}
		obj[file] = time;
		if(time > selfTime)
			selfTime = time;
	}, this);
	if(this.nestedWatching) {
		Object.keys(this.directories).forEach(function(dir) {
			var w = this.directories[dir];
			var times = w.directoryWatcher.getTimes();
			Object.keys(times).forEach(function(file) {
				var time = times[file];
				obj[file] = time;
				if(time > selfTime)
					selfTime = time;
			});
		}, this);
		obj[this.path] = selfTime;
	}
	return obj;
};

DirectoryWatcher.prototype.close = function() {
	this.initialScan = false;
	this.watcher.close();
	if(this.nestedWatching) {
		Object.keys(this.directories).forEach(function(dir) {
			this.directories[dir].close();
		}, this);
	}
	if(this.parentWatcher) this.parentWatcher.close();
	this.emit("closed");
};

function ensureFsAccuracy(mtime) {
	if(!mtime) return;
	if(FS_ACCURACY > 1 && mtime % 1 !== 0)
		FS_ACCURACY = 1;
	else if(FS_ACCURACY > 10 && mtime % 10 !== 0)
		FS_ACCURACY = 10;
	else if(FS_ACCURACY > 100 && mtime % 100 !== 0)
		FS_ACCURACY = 100;
}
