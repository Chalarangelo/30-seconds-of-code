const test = require('tape');
const chunk = require('./chunk.js');

test('Testing chunk', (t) => {
	//For more information on all the methods supported by tape
	//Please go to https://github.com/substack/tape
  t.true(typeof chunk === 'function', 'chunk is a Function');
	t.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1,2],[3,4],[5]], "chunk([1, 2, 3, 4, 5], 2) returns [[1,2],[3,4],[5]] ");
	t.deepEqual(chunk([]), [], 'chunk([]) returns []');
  t.deepEqual(chunk(123), [], 'chunk(123) returns []');
  t.deepEqual(chunk({ a: 123}), [], 'chunk({ a: 123}) returns []');
  t.deepEqual(chunk('string', 2), [ 'st', 'ri', 'ng' ], 'chunk(string, 2) returns [ st, ri, ng ]');
  t.throws(() => chunk(), 'chunk() throws an error');
  t.throws(() => chunk(undefined), 'chunk(undefined) throws an error');
  t.throws(() => chunk(null), 'chunk(null) throws an error');

  let start = new Date().getTime();
  chunk('This is a string', 2)
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'chunk(This is a string, 2) takes less than 2s to run');
  t.end();
});