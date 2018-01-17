const test = require('tape');
const zip = require('./zip.js');

test('Testing zip', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zip === 'function', 'zip is a Function');
	t.deepEqual(zip(['a', 'b'], [1, 2], [true, false]), [['a', 1, true], ['b', 2, false]], 'zip([a, b], [1, 2], [true, false]) returns [[a, 1, true], [b, 2, false]]');
	t.deepEqual(zip(['a'], [1, 2], [true, false]), [['a', 1, true], [undefined, 2, false]], 'zip([a], [1, 2], [true, false]) returns [[a, 1, true], [undefined, 2, false]]');
	t.deepEqual(zip(), [], 'zip([]) returns []');
	t.deepEqual(zip(123), [], 'zip(123) returns []');
	t.true(Array.isArray(zip(['a', 'b'], [1, 2], [true, false])), 'zip([a, b], [1, 2], [true, false]) returns an Array');
	t.true(Array.isArray(zip(['a'], [1, 2], [true, false])), 'zip([a], [1, 2], [true, false]) returns an Array');
	t.throws(() => zip(null), 'zip(null) throws an error');
	t.throws(() => zip(undefined), 'zip(undefined) throws an error');

	t.end();
});
