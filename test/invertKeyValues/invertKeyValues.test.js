const test = require('tape');
const invertKeyValues = require('./invertKeyValues.js');

test('Testing invertKeyValues', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof invertKeyValues === 'function', 'invertKeyValues is a Function');
  t.deepEqual(invertKeyValues({ a: 1, b: 2, c: 1 }), { 1: [ 'a', 'c' ], 2: [ 'b' ] }, "invertKeyValues({ a: 1, b: 2, c: 1 }) returns { 1: [ 'a', 'c' ], 2: [ 'b' ] }");
  t.deepEqual(invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value), { group1: [ 'a', 'c' ], group2: [ 'b' ] }, "invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value) returns { group1: [ 'a', 'c' ], group2: [ 'b' ] }");
	//t.deepEqual(invertKeyValues(args..), 'Expected');
	//t.equal(invertKeyValues(args..), 'Expected');
	//t.false(invertKeyValues(args..), 'Expected');
	//t.throws(invertKeyValues(args..), 'Expected');
	t.end();
});