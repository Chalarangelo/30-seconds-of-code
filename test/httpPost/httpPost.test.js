const test = require('tape');
const httpPost = require('./httpPost.js');

test('Testing httpPost', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof httpPost === 'function', 'httpPost is a Function');
	//t.deepEqual(httpPost(args..), 'Expected');
	//t.equal(httpPost(args..), 'Expected');
	//t.false(httpPost(args..), 'Expected');
	//t.throws(httpPost(args..), 'Expected');
	t.end();
});