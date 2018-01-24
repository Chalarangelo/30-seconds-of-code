const test = require('tape');
const atob = require('./atob.js');

test('Testing atob', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof atob === 'function', 'atob is a Function');
  t.equals(atob('Zm9vYmFy'), 'foobar', 'atob("Zm9vYmFy") equals "foobar"');
  t.equals(atob('Z'), '', 'atob("Z") returns ""');
	//t.deepEqual(atob(args..), 'Expected');
	//t.equal(atob(args..), 'Expected');
	//t.false(atob(args..), 'Expected');
	//t.throws(atob(args..), 'Expected');
	t.end();
});
