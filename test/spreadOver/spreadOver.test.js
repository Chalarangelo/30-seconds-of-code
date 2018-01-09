const test = require('tape');
const spreadOver = require('./spreadOver.js');

test('Testing spreadOver', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof spreadOver === 'function', 'spreadOver is a Function');
	//t.deepEqual(spreadOver(args..), 'Expected');
	//t.equal(spreadOver(args..), 'Expected');
	//t.false(spreadOver(args..), 'Expected');
	//t.throws(spreadOver(args..), 'Expected');
	t.end();
});