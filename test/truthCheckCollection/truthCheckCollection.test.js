const test = require('tape');
const truthCheckCollection = require('./truthCheckCollection.js');

test('Testing truthCheckCollection', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof truthCheckCollection === 'function', 'truthCheckCollection is a Function');
	//t.deepEqual(truthCheckCollection(args..), 'Expected');
	//t.equal(truthCheckCollection(args..), 'Expected');
	//t.false(truthCheckCollection(args..), 'Expected');
	//t.throws(truthCheckCollection(args..), 'Expected');
	t.end();
});