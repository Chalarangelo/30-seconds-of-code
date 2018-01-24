const test = require('tape');
const intersection = require('./intersection.js');

test('Testing intersection', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof intersection === 'function', 'intersection is a Function');
  t.deepEqual(intersection([1, 2, 3], [4, 3, 2]), [2, 3], "Returns a list of elements that exist in both arrays");
  //t.deepEqual(intersection(args..), 'Expected');
  //t.equal(intersection(args..), 'Expected');
  //t.false(intersection(args..), 'Expected');
  //t.throws(intersection(args..), 'Expected');
  t.end();
});