const test = require('tape');
const toEnglishDate = require('./toEnglishDate.js');

test('Testing toEnglishDate', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof toEnglishDate === 'function', 'toEnglishDate is a Function');
	// t.equal(toEnglishDate('09/21/2010'), '21/09/2010', 'Converts a date from American format to English format');
	//t.deepEqual(toEnglishDate(args..), 'Expected');
	//t.equal(toEnglishDate(args..), 'Expected');
	//t.false(toEnglishDate(args..), 'Expected');
	//t.throws(toEnglishDate(args..), 'Expected');
	t.end();
});