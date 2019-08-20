'use strict';
const invertKv = require('invert-kv');
const all = require('./lcid.json');

const inverted = invertKv(all);

exports.from = lcidCode => {
	if (typeof lcidCode !== 'number') {
		throw new TypeError('Expected a number');
	}

	return inverted[lcidCode];
};

exports.to = localeId => {
	if (typeof localeId !== 'string') {
		throw new TypeError('Expected a string');
	}

	return all[localeId];
};

exports.all = all;
