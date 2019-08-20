/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class Storage {
	constructor(duration) {
		this.duration = duration;
		this.running = new Map();
		this.data = new Map();
		this.levels = [];
		if(duration > 0) {
			this.levels.push(new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set());
			for(let i = 8000; i < duration; i += 500)
				this.levels.push(new Set());
		}
		this.count = 0;
		this.interval = null;
		this.needTickCheck = false;
		this.nextTick = null;
		this.passive = true;
		this.tick = this.tick.bind(this);
	}

	ensureTick() {
		if(!this.interval && this.duration > 0 && !this.nextTick)
			this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length));
	}

	finished(name, err, result) {
		const callbacks = this.running.get(name);
		this.running.delete(name);
		if(this.duration > 0) {
			this.data.set(name, [err, result]);
			const levelData = this.levels[0];
			this.count -= levelData.size;
			levelData.add(name);
			this.count += levelData.size;
			this.ensureTick();
		}
		for(let i = 0; i < callbacks.length; i++) {
			callbacks[i](err, result);
		}
	}

	finishedSync(name, err, result) {
		if(this.duration > 0) {
			this.data.set(name, [err, result]);
			const levelData = this.levels[0];
			this.count -= levelData.size;
			levelData.add(name);
			this.count += levelData.size;
			this.ensureTick();
		}
	}

	provide(name, provider, callback) {
		if(typeof name !== "string") {
			callback(new TypeError("path must be a string"));
			return;
		}
		let running = this.running.get(name);
		if(running) {
			running.push(callback);
			return;
		}
		if(this.duration > 0) {
			this.checkTicks();
			const data = this.data.get(name);
			if(data) {
				return process.nextTick(() => {
					callback.apply(null, data);
				});
			}
		}
		this.running.set(name, running = [callback]);
		provider(name, (err, result) => {
			this.finished(name, err, result);
		});
	}

	provideSync(name, provider) {
		if(typeof name !== "string") {
			throw new TypeError("path must be a string");
		}
		if(this.duration > 0) {
			this.checkTicks();
			const data = this.data.get(name);
			if(data) {
				if(data[0])
					throw data[0];
				return data[1];
			}
		}
		let result;
		try {
			result = provider(name);
		} catch(e) {
			this.finishedSync(name, e);
			throw e;
		}
		this.finishedSync(name, null, result);
		return result;
	}

	tick() {
		const decay = this.levels.pop();
		for(let item of decay) {
			this.data.delete(item);
		}
		this.count -= decay.size;
		decay.clear();
		this.levels.unshift(decay);
		if(this.count === 0) {
			clearInterval(this.interval);
			this.interval = null;
			this.nextTick = null;
			return true;
		} else if(this.nextTick) {
			this.nextTick += Math.floor(this.duration / this.levels.length);
			const time = new Date().getTime();
			if(this.nextTick > time) {
				this.nextTick = null;
				this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length));
				return true;
			}
		} else if(this.passive) {
			clearInterval(this.interval);
			this.interval = null;
			this.nextTick = new Date().getTime() + Math.floor(this.duration / this.levels.length);
		} else {
			this.passive = true;
		}
	}

	checkTicks() {
		this.passive = false;
		if(this.nextTick) {
			while(!this.tick());
		}
	}

	purge(what) {
		if(!what) {
			this.count = 0;
			clearInterval(this.interval);
			this.nextTick = null;
			this.data.clear();
			this.levels.forEach(level => {
				level.clear();
			});
		} else if(typeof what === "string") {
			for(let key of this.data.keys()) {
				if(key.startsWith(what))
					this.data.delete(key);
			}
		} else {
			for(let i = what.length - 1; i >= 0; i--) {
				this.purge(what[i]);
			}
		}
	}
}

module.exports = class CachedInputFileSystem {
	constructor(fileSystem, duration) {
		this.fileSystem = fileSystem;
		this._statStorage = new Storage(duration);
		this._readdirStorage = new Storage(duration);
		this._readFileStorage = new Storage(duration);
		this._readJsonStorage = new Storage(duration);
		this._readlinkStorage = new Storage(duration);

		this._stat = this.fileSystem.stat ? this.fileSystem.stat.bind(this.fileSystem) : null;
		if(!this._stat) this.stat = null;

		this._statSync = this.fileSystem.statSync ? this.fileSystem.statSync.bind(this.fileSystem) : null;
		if(!this._statSync) this.statSync = null;

		this._readdir = this.fileSystem.readdir ? this.fileSystem.readdir.bind(this.fileSystem) : null;
		if(!this._readdir) this.readdir = null;

		this._readdirSync = this.fileSystem.readdirSync ? this.fileSystem.readdirSync.bind(this.fileSystem) : null;
		if(!this._readdirSync) this.readdirSync = null;

		this._readFile = this.fileSystem.readFile ? this.fileSystem.readFile.bind(this.fileSystem) : null;
		if(!this._readFile) this.readFile = null;

		this._readFileSync = this.fileSystem.readFileSync ? this.fileSystem.readFileSync.bind(this.fileSystem) : null;
		if(!this._readFileSync) this.readFileSync = null;

		if(this.fileSystem.readJson) {
			this._readJson = this.fileSystem.readJson.bind(this.fileSystem);
		} else if(this.readFile) {
			this._readJson = (path, callback) => {
				this.readFile(path, (err, buffer) => {
					if(err) return callback(err);
					let data;
					try {
						data = JSON.parse(buffer.toString("utf-8"));
					} catch(e) {
						return callback(e);
					}
					callback(null, data);
				});
			};
		} else {
			this.readJson = null;
		}
		if(this.fileSystem.readJsonSync) {
			this._readJsonSync = this.fileSystem.readJsonSync.bind(this.fileSystem);
		} else if(this.readFileSync) {
			this._readJsonSync = (path) => {
				const buffer = this.readFileSync(path);
				const data = JSON.parse(buffer.toString("utf-8"));
				return data;
			};
		} else {
			this.readJsonSync = null;
		}

		this._readlink = this.fileSystem.readlink ? this.fileSystem.readlink.bind(this.fileSystem) : null;
		if(!this._readlink) this.readlink = null;

		this._readlinkSync = this.fileSystem.readlinkSync ? this.fileSystem.readlinkSync.bind(this.fileSystem) : null;
		if(!this._readlinkSync) this.readlinkSync = null;
	}

	stat(path, callback) {
		this._statStorage.provide(path, this._stat, callback);
	}

	readdir(path, callback) {
		this._readdirStorage.provide(path, this._readdir, callback);
	}

	readFile(path, callback) {
		this._readFileStorage.provide(path, this._readFile, callback);
	}

	readJson(path, callback) {
		this._readJsonStorage.provide(path, this._readJson, callback);
	}

	readlink(path, callback) {
		this._readlinkStorage.provide(path, this._readlink, callback);
	}

	statSync(path) {
		return this._statStorage.provideSync(path, this._statSync);
	}

	readdirSync(path) {
		return this._readdirStorage.provideSync(path, this._readdirSync);
	}

	readFileSync(path) {
		return this._readFileStorage.provideSync(path, this._readFileSync);
	}

	readJsonSync(path) {
		return this._readJsonStorage.provideSync(path, this._readJsonSync);
	}

	readlinkSync(path) {
		return this._readlinkStorage.provideSync(path, this._readlinkSync);
	}

	purge(what) {
		this._statStorage.purge(what);
		this._readdirStorage.purge(what);
		this._readFileStorage.purge(what);
		this._readlinkStorage.purge(what);
		this._readJsonStorage.purge(what);
	}
};
