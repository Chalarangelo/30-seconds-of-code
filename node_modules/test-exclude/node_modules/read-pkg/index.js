'use strict';
const path = require('path');
const loadJsonFile = require('load-json-file');
const pathType = require('path-type');

module.exports = (fp, opts) => {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};

	return pathType.dir(fp)
		.then(isDir => {
			if (isDir) {
				fp = path.join(fp, 'package.json');
			}

			return loadJsonFile(fp);
		})
		.then(x => {
			if (opts.normalize !== false) {
				require('normalize-package-data')(x);
			}

			return x;
		});
};

module.exports.sync = (fp, opts) => {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};
	fp = pathType.dirSync(fp) ? path.join(fp, 'package.json') : fp;

	const x = loadJsonFile.sync(fp);

	if (opts.normalize !== false) {
		require('normalize-package-data')(x);
	}

	return x;
};
