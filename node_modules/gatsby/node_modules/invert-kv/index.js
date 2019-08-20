'use strict';
module.exports = object => {
	if (typeof object !== 'object') {
		throw new TypeError('Expected an object');
	}

	const ret = {};

	for (const key of Object.keys(object)) {
		const value = object[key];
		ret[value] = key;
	}

	return ret;
};
