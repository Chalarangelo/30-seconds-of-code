'use strict';
const findUp = require('find-up');
const readPkg = require('read-pkg');

module.exports = options => {
	return findUp('package.json', options).then(fp => {
		if (!fp) {
			return {};
		}

		return readPkg(fp, options).then(pkg => ({pkg, path: fp}));
	});
};

module.exports.sync = options => {
	const fp = findUp.sync('package.json', options);

	if (!fp) {
		return {};
	}

	return {
		pkg: readPkg.sync(fp, options),
		path: fp
	};
};
