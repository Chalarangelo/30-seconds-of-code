const test = require('tape');
const overArgs = require('./overArgs.js');

test('Testing overArgs', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof overArgs === 'function', 'overArgs is a Function');
  const square = n => n * n;
  const double = n => n * 2;
  const fn = overArgs((x, y) => [x, y], [square, double]);
  t.deepEqual(fn(9, 3), [81, 6], 'Invokes the provided function with its arguments transformed');
  //t.deepEqual(overArgs(args..), 'Expected');
  //t.equal(overArgs(args..), 'Expected');
  //t.false(overArgs(args..), 'Expected');
  //t.throws(overArgs(args..), 'Expected');
  t.end();
});
