const test = require('tape');
const without = require('./without.js');

test('Testing without', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof without === 'function', 'without is a Function');
	t.deepEqual(without([2, 1, 2, 3], 1, 2), [3], "without([2, 1, 2, 3], 1, 2) returns [3]");
	t.deepEqual(without([]), [], "without([]) returns []");
	t.deepEqual(without([3, 1, true, '3', true], '3', true), [3, 1], "without([3, 1, true, '3', true], '3', true) returns [3, 1]");
	t.deepEqual(without('string'.split(''), 's', 't', 'g'), ['r', 'i', 'n'], "without('string'.split(''), 's', 't', 'g') returns ['r', 'i', 'n']");
	t.throws(() => without(), 'without() throws an error');
	t.throws(() => without(null), 'without(null) throws an error');
	t.throws(() => without(undefined), 'without(undefined) throws an error');
	t.throws(() => without(123), 'without() throws an error');
	t.throws(() => without({}), 'without({}) throws an error');

	t.end();
});
