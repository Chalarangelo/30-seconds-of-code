const test = require('tape');
const union = require('./union.js');

test('Testing union', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof union === 'function', 'union is a Function');
  t.deepEqual(union([1, 2, 3], [4, 3, 2]), [1, 2, 3, 4], "Returns every element that exists in any of the two arrays once");
  //t.deepEqual(union(args..), 'Expected');
  //t.equal(union(args..), 'Expected');
  //t.false(union(args..), 'Expected');
  //t.throws(union(args..), 'Expected');
  t.end();
});