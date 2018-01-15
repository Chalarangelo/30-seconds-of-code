const test = require('tape');
const colorize = require('./colorize.js');

test('Testing colorize', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof colorize === 'function', 'colorize is a Function');
	//t.deepEqual(colorize(args..), 'Expected');
	//t.equal(colorize(args..), 'Expected');
	//t.false(colorize(args..), 'Expected');
	//t.throws(colorize(args..), 'Expected');
	t.end();
});