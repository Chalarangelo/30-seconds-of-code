/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const fs = require("graceful-fs");

class NodeJsInputFileSystem {
	readdir(path, callback) {
		fs.readdir(path, (err, files) => {
			callback(err, files && files.map(file => {
				return file.normalize ? file.normalize("NFC") : file;
			}));
		});
	}

	readdirSync(path) {
		const files = fs.readdirSync(path);
		return files && files.map(file => {
			return file.normalize ? file.normalize("NFC") : file;
		});
	}
}

const fsMethods = [
	"stat",
	"statSync",
	"readFile",
	"readFileSync",
	"readlink",
	"readlinkSync"
];

for(const key of fsMethods) {
	Object.defineProperty(NodeJsInputFileSystem.prototype, key, {
		configurable: true,
		writable: true,
		value: fs[key].bind(fs)
	});
}

module.exports = NodeJsInputFileSystem;
