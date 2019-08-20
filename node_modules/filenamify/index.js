'use strict';
const path = require('path');
const trimRepeated = require('trim-repeated');
const filenameReservedRegex = require('filename-reserved-regex');
const stripOuter = require('strip-outer');

// Doesn't make sense to have longer filenames
const MAX_FILENAME_LENGTH = 100;

const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g; // eslint-disable-line no-control-regex
const reRelativePath = /^\.+/;

const fn = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	options = options || {};

	const replacement = options.replacement === undefined ? '!' : options.replacement;

	if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
		throw new Error('Replacement string cannot contain reserved filename characters');
	}

	string = string.replace(filenameReservedRegex(), replacement);
	string = string.replace(reControlChars, replacement);
	string = string.replace(reRelativePath, replacement);

	if (replacement.length > 0) {
		string = trimRepeated(string, replacement);
		string = string.length > 1 ? stripOuter(string, replacement) : string;
	}

	string = filenameReservedRegex.windowsNames().test(string) ? string + replacement : string;
	string = string.slice(0, MAX_FILENAME_LENGTH);

	return string;
};

fn.path = (pth, options) => {
	pth = path.resolve(pth);
	return path.join(path.dirname(pth), fn(path.basename(pth), options));
};

module.exports = fn;
