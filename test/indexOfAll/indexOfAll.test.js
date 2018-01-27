const test = require('tape');
const indexOfAll = require('./indexOfAll.js');

test('Testing indexOfAll', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof indexOfAll === 'function', 'indexOfAll is a Function');
  t.deepEqual(indexOfAll([1, 2, 3, 1, 2, 3], 1), [0,3], "Returns all indices of val in an array");
  t.deepEqual(indexOfAll([1, 2, 3], 4), [], "Returns all indices of val in an array");
  //t.deepEqual(indexOfAll(args..), 'Expected');
  //t.equal(indexOfAll(args..), 'Expected');
  //t.false(indexOfAll(args..), 'Expected');
  //t.throws(indexOfAll(args..), 'Expected');
  t.end();
});