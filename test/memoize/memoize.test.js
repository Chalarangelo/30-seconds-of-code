const test = require('tape');
const memoize = require('./memoize.js');

test('Testing memoize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof memoize === 'function', 'memoize is a Function');
  const f = x => x * x;
  const square = memoize(f);
  t.equal(square(2), 4, 'Function works properly');
  t.equal(square(3), 9, 'Function works properly');
  t.deepEqual(Array.from(square.cache), [[2,4],[3,9]], 'Cache stores values');
  //t.deepEqual(memoize(args..), 'Expected');
  //t.equal(memoize(args..), 'Expected');
  //t.false(memoize(args..), 'Expected');
  //t.throws(memoize(args..), 'Expected');
  t.end();
});
