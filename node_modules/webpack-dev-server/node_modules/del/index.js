'use strict';
const path = require('path');
const globby = require('globby');
const isPathCwd = require('is-path-cwd');
const isPathInCwd = require('is-path-in-cwd');
const pify = require('pify');
const rimraf = require('rimraf');
const pMap = require('p-map');

const rimrafP = pify(rimraf);

function safeCheck(file) {
	if (isPathCwd(file)) {
		throw new Error('Cannot delete the current working directory. Can be overridden with the `force` option.');
	}

	if (!isPathInCwd(file)) {
		throw new Error('Cannot delete files/folders outside the current working directory. Can be overridden with the `force` option.');
	}
}

const del = (patterns, options) => {
	options = Object.assign({}, options);

	const {force, dryRun} = options;
	delete options.force;
	delete options.dryRun;

	const mapper = file => {
		if (!force) {
			safeCheck(file);
		}

		file = path.resolve(options.cwd || '', file);

		if (dryRun) {
			return file;
		}

		return rimrafP(file, {glob: false}).then(() => file);
	};

	return globby(patterns, options).then(files => pMap(files, mapper, options));
};

module.exports = del;
// TODO: Remove this for the next major release
module.exports.default = del;

module.exports.sync = (patterns, options) => {
	options = Object.assign({}, options);

	const {force, dryRun} = options;
	delete options.force;
	delete options.dryRun;

	return globby.sync(patterns, options).map(file => {
		if (!force) {
			safeCheck(file);
		}

		file = path.resolve(options.cwd || '', file);

		if (!dryRun) {
			rimraf.sync(file, {glob: false});
		}

		return file;
	});
};
