const test = require('tape');
const capitalizeEveryWord = require('./capitalizeEveryWord.js');

test('Testing capitalizeEveryWord', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof capitalizeEveryWord === 'function', 'capitalizeEveryWord is a Function');
	//t.deepEqual(capitalizeEveryWord(args..), 'Expected');
	//t.equal(capitalizeEveryWord(args..), 'Expected');
	//t.false(capitalizeEveryWord(args..), 'Expected');
	//t.throws(capitalizeEveryWord(args..), 'Expected');
	t.end();
});