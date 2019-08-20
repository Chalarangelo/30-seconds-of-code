'use strict';
const fs = require('fs');
const path = require('path');
const fileType = require('file-type');
const globby = require('globby');
const makeDir = require('make-dir');
const pify = require('pify');
const pPipe = require('p-pipe');
const replaceExt = require('replace-ext');

const fsP = pify(fs);

const handleFile = (input, output, options) => fsP.readFile(input).then(data => {
	const dest = output ? path.join(output, path.basename(input)) : null;

	if (options.plugins && !Array.isArray(options.plugins)) {
		throw new TypeError('The `plugins` option should be an `Array`');
	}

	const pipe = options.plugins.length > 0 ? pPipe(options.plugins)(data) : Promise.resolve(data);

	return pipe
		.then(buffer => {
			const ret = {
				data: buffer,
				path: (fileType(buffer) && fileType(buffer).ext === 'webp') ? replaceExt(dest, '.webp') : dest
			};

			if (!dest) {
				return ret;
			}

			return makeDir(path.dirname(ret.path))
				.then(() => fsP.writeFile(ret.path, ret.data))
				.then(() => ret);
		})
		.catch(error => {
			error.message = `Error in file: ${input}\n\n${error.message}`;
			throw error;
		});
});

module.exports = (input, output, options) => {
	if (!Array.isArray(input)) {
		return Promise.reject(new TypeError(`Expected an \`Array\`, got \`${typeof input}\``));
	}

	if (typeof output === 'object') {
		options = output;
		output = null;
	}

	options = Object.assign({plugins: []}, options);
	options.plugins = options.use || options.plugins;

	return globby(input, {onlyFiles: true}).then(paths => Promise.all(paths.map(x => handleFile(x, output, options))));
};

module.exports.buffer = (input, options) => {
	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected a \`Buffer\`, got \`${typeof input}\``));
	}

	options = Object.assign({plugins: []}, options);
	options.plugins = options.use || options.plugins;

	if (options.plugins.length === 0) {
		return Promise.resolve(input);
	}

	return pPipe(options.plugins)(input);
};
