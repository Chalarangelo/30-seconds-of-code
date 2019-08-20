'use strict';
var path = require('path');
var commonDir = require('commondir');
var pkgDir = require('pkg-dir');
var mkdirp = require('mkdirp');

module.exports = function (options) {
	var name = options.name;
	var dir = options.cwd;
	if (options.files) {
		dir = commonDir(dir, options.files);
	} else {
		dir = dir || process.cwd();
	}

	dir = pkgDir.sync(dir);

	if (dir) {
		dir = path.join(dir, 'node_modules', '.cache', name);

		if (dir && options.create) {
			mkdirp.sync(dir);
		}

		if (options.thunk) {
			return function () {
				return path.join.apply(path, [dir].concat(Array.prototype.slice.call(arguments)));
			};
		}
	}

	return dir;
};
