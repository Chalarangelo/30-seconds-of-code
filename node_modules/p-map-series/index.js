'use strict';
const pReduce = require('p-reduce');

module.exports = (iterable, iterator) => {
	const ret = [];

	return pReduce(iterable, (a, b, i) => {
		return Promise.resolve(iterator(b, i)).then(val => {
			ret.push(val);
		});
	}).then(() => ret);
};
