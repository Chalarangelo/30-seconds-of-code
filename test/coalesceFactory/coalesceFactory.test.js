const test = require('tape');
const coalesceFactory = require('./coalesceFactory.js');

test('Testing coalesceFactory', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof coalesceFactory === 'function', 'coalesceFactory is a Function');
	const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
	t.deepEqual(customCoalesce(undefined, null, NaN, '', 'Waldo'), 'Waldo', "Returns a customized coalesce function");
	//t.deepEqual(coalesceFactory(args..), 'Expected');
	//t.equal(coalesceFactory(args..), 'Expected');
	//t.false(coalesceFactory(args..), 'Expected');
	//t.throws(coalesceFactory(args..), 'Expected');
	t.end();
});