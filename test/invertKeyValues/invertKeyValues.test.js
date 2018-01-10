const test = require('tape');
const invertKeyValues = require('./invertKeyValues.js');

test('Testing invertKeyValues', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof invertKeyValues === 'function', 'invertKeyValues is a Function');
	t.deepEqual(invertKeyValues({ name: 'John', age: 20 }), { 20: 'age', John: 'name' }, "Inverts the key-value pairs of an object");
	//t.deepEqual(invertKeyValues(args..), 'Expected');
	//t.equal(invertKeyValues(args..), 'Expected');
	//t.false(invertKeyValues(args..), 'Expected');
	//t.throws(invertKeyValues(args..), 'Expected');
	t.end();
});