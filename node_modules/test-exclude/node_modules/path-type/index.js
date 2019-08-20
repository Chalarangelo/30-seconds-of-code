'use strict';
const fs = require('fs');
const pify = require('pify');

function type(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		return Promise.reject(new TypeError(`Expected a string, got ${typeof fp}`));
	}

	return pify(fs[fn])(fp)
		.then(stats => stats[fn2]())
		.catch(err => {
			if (err.code === 'ENOENT') {
				return false;
			}

			throw err;
		});
}

function typeSync(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof fp}`);
	}

	try {
		return fs[fn](fp)[fn2]();
	} catch (err) {
		if (err.code === 'ENOENT') {
			return false;
		}

		throw err;
	}
}

exports.file = type.bind(null, 'stat', 'isFile');
exports.dir = type.bind(null, 'stat', 'isDirectory');
exports.symlink = type.bind(null, 'lstat', 'isSymbolicLink');
exports.fileSync = typeSync.bind(null, 'statSync', 'isFile');
exports.dirSync = typeSync.bind(null, 'statSync', 'isDirectory');
exports.symlinkSync = typeSync.bind(null, 'lstatSync', 'isSymbolicLink');
