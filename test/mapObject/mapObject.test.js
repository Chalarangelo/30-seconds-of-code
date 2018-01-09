const test = require('tape');
const mapObject = require('./mapObject.js');

test('Testing mapObject', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof mapObject === 'function', 'mapObject is a Function');
	//t.deepEqual(mapObject(args..), 'Expected');
	//t.equal(mapObject(args..), 'Expected');
	//t.false(mapObject(args..), 'Expected');
	//t.throws(mapObject(args..), 'Expected');
	t.end();
});