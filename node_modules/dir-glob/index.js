'use strict';
const path = require('path');
const arrify = require('arrify');
const pathType = require('path-type');

const getExtensions = extensions => extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0];
const getPath = filepath => filepath[0] === '!' ? filepath.slice(1) : filepath;

const addExtensions = (file, extensions) => {
	if (path.extname(file)) {
		return `**/${file}`;
	}

	return `**/${file}.${getExtensions(extensions)}`;
};

const getGlob = (dir, opts) => {
	opts = Object.assign({}, opts);

	if (opts.files && !Array.isArray(opts.files)) {
		throw new TypeError(`\`options.files\` must be an \`Array\`, not \`${typeof opts.files}\``);
	}

	if (opts.extensions && !Array.isArray(opts.extensions)) {
		throw new TypeError(`\`options.extensions\` must be an \`Array\`, not \`${typeof opts.extensions}\``);
	}

	if (opts.files && opts.extensions) {
		return opts.files.map(x => path.join(dir, addExtensions(x, opts.extensions)));
	} else if (opts.files) {
		return opts.files.map(x => path.join(dir, `**/${x}`));
	} else if (opts.extensions) {
		return [path.join(dir, `**/*.${getExtensions(opts.extensions)}`)];
	}

	return [path.join(dir, '**')];
};

module.exports = (input, opts) => {
	return Promise.all(arrify(input).map(x => pathType.dir(getPath(x))
		.then(isDir => isDir ? getGlob(x, opts) : x)))
		.then(globs => [].concat.apply([], globs));
};

module.exports.sync = (input, opts) => {
	const globs = arrify(input).map(x => pathType.dirSync(getPath(x)) ? getGlob(x, opts) : x);
	return [].concat.apply([], globs);
};
