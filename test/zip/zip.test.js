const test = require('tape');
const zip = require('./zip.js');

test('Testing zip', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof zip === 'function', 'zip is a Function');
	//t.deepEqual(zip(args..), 'Expected');
	//t.equal(zip(args..), 'Expected');
	//t.false(zip(args..), 'Expected');
	//t.throws(zip(args..), 'Expected');
	t.end();
});