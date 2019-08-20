'use strict';
const fs = require('fs');
const path = require('path');
const parseJson = require('parse-json');
const pify = require('pify');

const readFileAsync = pify(fs.readFile);

module.exports = options => {
	options = Object.assign({
		cwd: process.cwd(),
		normalize: true
	}, options);

	const filePath = path.resolve(options.cwd, 'package.json');

	return readFileAsync(filePath, 'utf8').then(file => {
		const json = parseJson(file);

		if (options.normalize) {
			require('normalize-package-data')(json);
		}

		return json;
	});
};

module.exports.sync = options => {
	options = Object.assign({
		cwd: process.cwd(),
		normalize: true
	}, options);

	const filePath = path.resolve(options.cwd, 'package.json');
	const json = parseJson(fs.readFileSync(filePath, 'utf8'));

	if (options.normalize) {
		require('normalize-package-data')(json);
	}

	return json;
};
