'use strict';
const findUp = require('find-up');
const readPkg = require('read-pkg');

module.exports = opts => {
	return findUp('package.json', opts).then(fp => {
		if (!fp) {
			return {};
		}

		return readPkg(fp, opts).then(pkg => ({pkg, path: fp}));
	});
};

module.exports.sync = opts => {
	const fp = findUp.sync('package.json', opts);

	if (!fp) {
		return {};
	}

	return {
		pkg: readPkg.sync(fp, opts),
		path: fp
	};
};
