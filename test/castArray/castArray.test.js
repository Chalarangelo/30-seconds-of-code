const test = require('tape');
const castArray = require('./castArray.js');

test('Testing castArray', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof castArray === 'function', 'castArray is a Function');
	//t.deepEqual(castArray(args..), 'Expected');
	//t.equal(castArray(args..), 'Expected');
	//t.false(castArray(args..), 'Expected');
	//t.throws(castArray(args..), 'Expected');
	t.end();
});