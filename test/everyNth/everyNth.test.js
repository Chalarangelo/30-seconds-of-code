const test = require('tape');
const everyNth = require('./everyNth.js');

test('Testing everyNth', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof everyNth === 'function', 'everyNth is a Function');
  t.deepEqual(everyNth([1, 2, 3, 4, 5, 6], 2), [ 2, 4, 6 ], "Returns every nth element in an array");
  //t.deepEqual(everyNth(args..), 'Expected');
  //t.equal(everyNth(args..), 'Expected');
  //t.false(everyNth(args..), 'Expected');
  //t.throws(everyNth(args..), 'Expected');
  t.end();
});