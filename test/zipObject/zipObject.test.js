const test = require('tape');
const zipObject = require('./zipObject.js');

test('Testing zipObject', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zipObject === 'function', 'zipObject is a Function');
	t.deepEqual(zipObject(['a', 'b', 'c'], [1, 2]), {a: 1, b: 2, c: undefined}, 'zipObject([a, b, c], [1, 2]) returns {a: 1, b: 2, c: undefined}');
	t.deepEqual(zipObject(['a', 'b'], [1, 2, 3]), {a: 1, b: 2}, 'zipObject([a, b], [1, 2, 3]) returns {a: 1, b: 2}');
	t.deepEqual(zipObject(['a', 'b', 'c'], 'string'), { a: 's', b: 't', c: 'r' }, 'zipObject([a, b, c], string) returns { a: s, b: t, c: r }');
	t.deepEqual(zipObject(['a'], 'string'), { a: 's' }, 'zipObject([a], string) returns { a: s }');
	t.throws(() => zipObject(), 'zipObject() throws an error');
	t.throws(() => zipObject(['string'], null), 'zipObject([string], null) throws an error');
	t.throws(() => zipObject(null, [1]), 'zipObject(null, [1]) throws an error');
	t.throws(() => zipObject('string'), 'zipObject(string) throws an error');
	t.throws(() => zipObject('test', 'string'), 'zipObject(test, string) throws an error');

	t.end();
});
