'use strict';
const semver = require('semver');
const binVersion = require('bin-version');
const semverTruncate = require('semver-truncate');

module.exports = (binary, semverRange, options) => {
	if (typeof binary !== 'string' || typeof semverRange !== 'string') {
		return Promise.reject(new Error('`binary` and `semverRange` arguments required'));
	}

	if (!semver.validRange(semverRange)) {
		return Promise.reject(new Error('Invalid version range'));
	}

	return binVersion(binary, options).then(binaryVersion => {
		if (!semver.satisfies(semverTruncate(binaryVersion, 'patch'), semverRange)) {
			const error = new Error(`${binary} ${binaryVersion} doesn't satisfy the version requirement of ${semverRange}`);
			error.name = 'InvalidBinaryVersion';
			throw error;
		}
	});
};
