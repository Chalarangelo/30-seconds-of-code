const test = require('tape');
const takeWhile = require('./takeWhile.js');

test('Testing takeWhile', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof takeWhile === 'function', 'takeWhile is a Function');
  t.deepEqual(takeWhile([1, 2, 3, 4], n => n >= 3), [1, 2], 'Removes elements until the function returns true');
  //t.deepEqual(takeWhile(args..), 'Expected');
  //t.equal(takeWhile(args..), 'Expected');
  //t.false(takeWhile(args..), 'Expected');
  //t.throws(takeWhile(args..), 'Expected');
  t.end();
});
