const test = require('tape');
const compact = require('./compact.js');

test('Testing compact', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof compact === 'function', 'compact is a Function');
  t.deepEqual(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]), [ 1, 2, 3, 'a', 's', 34 ], "Removes falsey values from an array");
  //t.deepEqual(compact(args..), 'Expected');
  //t.equal(compact(args..), 'Expected');
  //t.false(compact(args..), 'Expected');
  //t.throws(compact(args..), 'Expected');
  t.end();
});