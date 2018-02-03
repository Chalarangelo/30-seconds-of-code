const test = require('tape');
const differenceBy = require('./differenceBy.js');

test('Testing differenceBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof differenceBy === 'function', 'differenceBy is a Function');
  t.deepEqual(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor), [1.2], 'Works using a native function and numbers');
  t.deepEqual(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x), [ { x: 2 } ], 'Works with arrow function and objects');
  //t.deepEqual(differenceBy(args..), 'Expected');
  //t.equal(differenceBy(args..), 'Expected');
  //t.false(differenceBy(args..), 'Expected');
  //t.throws(differenceBy(args..), 'Expected');
  t.end();
});
