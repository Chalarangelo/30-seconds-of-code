'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var coercibleObject = { valueOf: function () { return 3; }, toString: function () { return 42; } };
var valueOfOnlyObject = { valueOf: function () { return 4; }, toString: function () { return {}; } };
var toStringOnlyObject = { valueOf: function () { return {}; }, toString: function () { return 7; } };
var uncoercibleObject = { valueOf: function () { return {}; }, toString: function () { return {}; } };
var objects = [{}, coercibleObject, toStringOnlyObject, valueOfOnlyObject];
var nullPrimitives = [undefined, null];
var nonIntegerNumbers = [-1.3, 0.2, 1.8, 1 / 3];
var numbers = [0, -0, Infinity, -Infinity, 42].concat(nonIntegerNumbers);
var strings = ['', 'foo', 'a\uD83D\uDCA9c'];
var booleans = [true, false];
var symbols = hasSymbols ? [Symbol.iterator, Symbol('foo')] : [];
var nonSymbolPrimitives = [].concat(nullPrimitives, booleans, strings, numbers);
var nonNumberPrimitives = [].concat(nullPrimitives, booleans, strings, symbols);
var nonNullPrimitives = [].concat(booleans, strings, numbers, symbols);
var nonUndefinedPrimitives = [].concat(null, nonNullPrimitives);
var nonStrings = [].concat(nullPrimitives, booleans, numbers, symbols, objects);
var primitives = [].concat(nullPrimitives, nonNullPrimitives);
var nonPropertyKeys = [].concat(nullPrimitives, booleans, numbers, objects);
var propertyKeys = [].concat(strings, symbols);
var nonBooleans = [].concat(nullPrimitives, strings, symbols, numbers, objects);
var falsies = [].concat(nullPrimitives, false, '', 0, -0, NaN);
var truthies = [].concat(true, 'foo', 42, symbols, objects);
var timestamps = [].concat(0, 946713600000, 1546329600000);

module.exports = {
	coercibleObject: coercibleObject,
	valueOfOnlyObject: valueOfOnlyObject,
	toStringOnlyObject: toStringOnlyObject,
	uncoercibleObject: uncoercibleObject,
	objects: objects,
	nullPrimitives: nullPrimitives,
	numbers: numbers,
	strings: strings,
	booleans: booleans,
	symbols: symbols,
	hasSymbols: hasSymbols,
	nonSymbolPrimitives: nonSymbolPrimitives,
	nonNumberPrimitives: nonNumberPrimitives,
	nonNullPrimitives: nonNullPrimitives,
	nonUndefinedPrimitives: nonUndefinedPrimitives,
	nonStrings: nonStrings,
	nonNumbers: nonNumberPrimitives.concat(objects),
	nonIntegerNumbers: nonIntegerNumbers,
	primitives: primitives,
	nonPropertyKeys: nonPropertyKeys,
	propertyKeys: propertyKeys,
	nonBooleans: nonBooleans,
	falsies: falsies,
	truthies: truthies,
	timestamps: timestamps,
	bothDescriptor: function () {
		return { '[[Get]]': function () {}, '[[Value]]': true };
	},
	accessorDescriptor: function () {
		return {
			'[[Get]]': function () {},
			'[[Enumerable]]': true,
			'[[Configurable]]': true
		};
	},
	mutatorDescriptor: function () {
		return {
			'[[Set]]': function () {},
			'[[Enumerable]]': true,
			'[[Configurable]]': true
		};
	},
	dataDescriptor: function () {
		return {
			'[[Value]]': 42,
			'[[Writable]]': false
		};
	},
	genericDescriptor: function () {
		return {
			'[[Configurable]]': true,
			'[[Enumerable]]': false
		};
	}
};
