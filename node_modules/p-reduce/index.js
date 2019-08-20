'use strict';
module.exports = (iterable, reducer, initVal) => new Promise((resolve, reject) => {
	const iterator = iterable[Symbol.iterator]();
	let i = 0;

	const next = total => {
		const el = iterator.next();

		if (el.done) {
			resolve(total);
			return;
		}

		Promise.all([total, el.value])
			.then(value => {
				next(reducer(value[0], value[1], i++));
			})
			.catch(reject);
	};

	next(initVal);
});
