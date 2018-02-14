const test = require('tape');
const approximatelyEqual = require('./approximatelyEqual.js');

test('Testing approximatelyEqual', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof approximatelyEqual === 'function', 'approximatelyEqual is a Function');
  t.true(approximatelyEqual(Math.PI / 2.0 , 1.5708), 'Works for PI / 2');
  t.true(approximatelyEqual(0.1 + 0.2, 0.3), 'Works for 0.1 + 0.2 === 0.3');
  t.true(approximatelyEqual(0.5, 0.5), 'Works for exactly equal values');
  t.true(approximatelyEqual(0.501, 0.5, 0.1), 'Works for a custom epsilon');
  //t.deepEqual(approximatelyEqual(args..), 'Expected');
  //t.equal(approximatelyEqual(args..), 'Expected');
  //t.false(approximatelyEqual(args..), 'Expected');
  //t.throws(approximatelyEqual(args..), 'Expected');
  t.end();
});
