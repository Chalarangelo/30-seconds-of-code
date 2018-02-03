const test = require('tape');
const findLast = require('./findLast.js');

test('Testing findLast', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof findLast === 'function', 'findLast is a Function');
  t.equal(findLast([1, 2, 3, 4], n => n % 2 === 1), 3, 'Finds last element for which the given function returns true');
  //t.deepEqual(findLast(args..), 'Expected');
  //t.equal(findLast(args..), 'Expected');
  //t.false(findLast(args..), 'Expected');
  //t.throws(findLast(args..), 'Expected');
  t.end();
});
