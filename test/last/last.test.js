const test = require('tape');
const last = require('./last.js');

test('Testing last', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
	t.true(typeof last === 'function', 'last is a Function');
  t.true(last({ a: 1234}) === undefined, 'last({ a: 1234}) returns undefined');
  t.equal(last([1, 2, 3]), 3, "last([1, 2, 3]) returns 3");
  t.equal(last({ 0: false}), undefined, 'last({ 0: false}) returns undefined');
	t.equal(last('String'), 'g', 'last(String) returns g');
  t.throws(() => last(null), 'last(null) throws an Error');
  t.throws(() => last(undefined), 'last(undefined) throws an Error');
  t.throws(() => last(), 'last() throws an Error');

  let start = new Date().getTime();
  last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]) takes less than 2s to run');
	t.end();
});