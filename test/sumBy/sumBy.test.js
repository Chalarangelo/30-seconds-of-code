const test = require('tape');
const sumBy = require('./sumBy.js');

test('Testing sumBy', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof sumBy === 'function', 'sumBy is a Function');
	//t.deepEqual(sumBy(args..), 'Expected');
	//t.equal(sumBy(args..), 'Expected');
	//t.false(sumBy(args..), 'Expected');
	//t.throws(sumBy(args..), 'Expected');
	t.end();
});