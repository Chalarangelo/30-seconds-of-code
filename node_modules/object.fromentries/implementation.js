'use strict';

var ES = require('es-abstract/es2017');

var ThrowCompletion = function Throw(error) {
	throw error;
};

var legacyAssign = function assign(obj, entries) {
	for (var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		if (ES.Type(entry) !== 'Object') {
			throw new TypeError('iterator returned a non-object; entry expected');
		}

		var key = ES.Get(entry, '0');
		var value = ES.Get(entry, '1');
		var propertyKey = ES.ToPropertyKey(key);
		ES.CreateDataPropertyOrThrow(obj, propertyKey, value);
	}
};

/* global Symbol */

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

module.exports = function fromEntries(iterable) {
	ES.RequireObjectCoercible(iterable);

	var obj = {};

	// this part isn't in the spec, it's for a reasonable fallback for pre-ES6 environments
	if (!hasSymbols) {
		if (!ES.IsArray(iterable)) {
			throw new TypeError('this environment lacks native Symbols, and can not support non-Array iterables');
		}
		legacyAssign(obj, iterable);
		return obj;
	}

	/*
	return ES.AddEntriesFromIterable(obj, iterable, ES.CreateBuiltinFunction('CreateDataPropertyOnObject'));
	function adder(key, value) {
		var O = this;
		var propertyKey = ES.ToPropertyKey(key);
		CreateDataPropertyOrThrow(O, propertyKey, value);
	}
	*/

	var iter = ES.GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = ES.IteratorStep(iter);
		if (next === false) {
			return obj;
		}

		var nextItem = ES.IteratorValue(next);
		if (ES.Type(nextItem) !== 'Object') {
			var error = new TypeError('iterator returned a non-object; entry expected');
			return ES.IteratorClose(iter, ThrowCompletion(error));
		}

		try {
			var key = ES.Get(nextItem, '0');
			var value = ES.Get(nextItem, '1');
			var propertyKey = ES.ToPropertyKey(key);
			ES.CreateDataPropertyOrThrow(obj, propertyKey, value);
		} catch (e) {
			return ES.IteratorClose(iter, ThrowCompletion(e));
		}
	}
};
