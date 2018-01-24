const test = require('tape');
const xProd = require('./xProd.js');

test('Testing xProd', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof xProd === 'function', 'xProd is a Function');
	//t.deepEqual(xProd(args..), 'Expected');
	//t.equal(xProd(args..), 'Expected');
	//t.false(xProd(args..), 'Expected');
	//t.throws(xProd(args..), 'Expected');
	t.end();
});