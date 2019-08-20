'use strict';
const isPlainObj = require('is-plain-obj');

module.exports = (obj, opts) => {
	if (!isPlainObj(obj)) {
		throw new TypeError('Expected a plain object');
	}

	opts = opts || {};

	// DEPRECATED
	if (typeof opts === 'function') {
		throw new TypeError('Specify the compare function as an option instead');
	}

	const deep = opts.deep;
	const seenInput = [];
	const seenOutput = [];

	const sortKeys = x => {
		const seenIndex = seenInput.indexOf(x);

		if (seenIndex !== -1) {
			return seenOutput[seenIndex];
		}

		const ret = {};
		const keys = Object.keys(x).sort(opts.compare);

		seenInput.push(x);
		seenOutput.push(ret);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const val = x[key];

			if (deep && Array.isArray(val)) {
				const retArr = [];

				for (let j = 0; j < val.length; j++) {
					retArr[j] = isPlainObj(val[j]) ? sortKeys(val[j]) : val[j];
				}

				ret[key] = retArr;
				continue;
			}

			ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
		}

		return ret;
	};

	return sortKeys(obj);
};
