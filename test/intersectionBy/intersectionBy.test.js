const test = require('tape');
const intersectionBy = require('./intersectionBy.js');

test('Testing intersectionBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof intersectionBy === 'function', 'intersectionBy is a Function');
  t.deepEqual(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor), [2.1], 'Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both');
  //t.deepEqual(intersectionBy(args..), 'Expected');
  //t.equal(intersectionBy(args..), 'Expected');
  //t.false(intersectionBy(args..), 'Expected');
  //t.throws(intersectionBy(args..), 'Expected');
  t.end();
});
