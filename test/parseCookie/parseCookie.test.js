const test = require('tape');
const parseCookie = require('./parseCookie.js');

test('Testing parseCookie', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof parseCookie === 'function', 'parseCookie is a Function');
	//t.deepEqual(parseCookie(args..), 'Expected');
	//t.equal(parseCookie(args..), 'Expected');
	//t.false(parseCookie(args..), 'Expected');
	//t.throws(parseCookie(args..), 'Expected');
	t.end();
});