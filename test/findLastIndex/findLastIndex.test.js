const test = require('tape');
const findLastIndex = require('./findLastIndex.js');

test('Testing findLastIndex', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof findLastIndex === 'function', 'findLastIndex is a Function');
  t.equal(findLastIndex([1, 2, 3, 4], n => n % 2 === 1), 2, 'Finds last index for which the given function returns true');
  //t.deepEqual(findLastIndex(args..), 'Expected');
  //t.equal(findLastIndex(args..), 'Expected');
  //t.false(findLastIndex(args..), 'Expected');
  //t.throws(findLastIndex(args..), 'Expected');
  t.end();
});
