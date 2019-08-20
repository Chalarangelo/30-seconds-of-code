'use strict';
const fs = require('fs');
const path = require('path');
const types = require('./types');

// https://github.com/npm/npm/blob/latest/lib/config/core.js#L409-L423
const envReplace = str => {
	if (typeof str !== 'string' || !str) {
		return str;
	}

	// Replace any ${ENV} values with the appropriate environment
	const regex = /(\\*)\$\{([^}]+)\}/g;

	return str.replace(regex, (orig, esc, name) => {
		esc = esc.length > 0 && esc.length % 2;

		if (esc) {
			return orig;
		}

		if (process.env[name] === undefined) {
			throw new Error(`Failed to replace env in config: ${orig}`);
		}

		return process.env[name];
	});
};

// https://github.com/npm/npm/blob/latest/lib/config/core.js#L362-L407
const parseField = (field, key) => {
	if (typeof field !== 'string') {
		return field;
	}

	const typeList = [].concat(types[key]);
	const isPath = typeList.indexOf(path) !== -1;
	const isBool = typeList.indexOf(Boolean) !== -1;
	const isString = typeList.indexOf(String) !== -1;
	const isNumber = typeList.indexOf(Number) !== -1;

	field = `${field}`.trim();

	if (/^".*"$/.test(field)) {
		try {
			field = JSON.parse(field);
		} catch (err) {
			throw new Error(`Failed parsing JSON config key ${key}: ${field}`);
		}
	}

	if (isBool && !isString && field === '') {
		return true;
	}

	switch (field) { // eslint-disable-line default-case
		case 'true': {
			return true;
		}

		case 'false': {
			return false;
		}

		case 'null': {
			return null;
		}

		case 'undefined': {
			return undefined;
		}
	}

	field = envReplace(field);

	if (isPath) {
		const regex = process.platform === 'win32' ? /^~(\/|\\)/ : /^~\//;

		if (regex.test(field) && process.env.HOME) {
			field = path.resolve(process.env.HOME, field.substr(2));
		}

		field = path.resolve(field);
	}

	if (isNumber && !field.isNan()) {
		field = Number(field);
	}

	return field;
};

// https://github.com/npm/npm/blob/latest/lib/config/find-prefix.js
const findPrefix = name => {
	name = path.resolve(name);

	let walkedUp = false;

	while (path.basename(name) === 'node_modules') {
		name = path.dirname(name);
		walkedUp = true;
	}

	if (walkedUp) {
		return name;
	}

	const find = (name, original) => {
		const regex = /^[a-zA-Z]:(\\|\/)?$/;

		if (name === '/' || (process.platform === 'win32' && regex.test(name))) {
			return original;
		}

		try {
			const files = fs.readdirSync(name);

			if (files.indexOf('node_modules') !== -1 || files.indexOf('package.json') !== -1) {
				return name;
			}

			const dirname = path.dirname(name);

			if (dirname === name) {
				return original;
			}

			return find(dirname, original);
		} catch (err) {
			if (name === original) {
				if (err.code === 'ENOENT') {
					return original;
				}

				throw err;
			}

			return original;
		}
	};

	return find(name, name);
};

exports.envReplace = envReplace;
exports.findPrefix = findPrefix;
exports.parseField = parseField;
