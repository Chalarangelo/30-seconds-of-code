const test = require('tape');
const coalesce = require('./coalesce.js');

test('Testing coalesce', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof coalesce === 'function', 'coalesce is a Function');
  t.deepEqual(coalesce(null, undefined, '', NaN, 'Waldo'), '', "Returns the first non-null/undefined argument");
  //t.deepEqual(coalesce(args..), 'Expected');
  //t.equal(coalesce(args..), 'Expected');
  //t.false(coalesce(args..), 'Expected');
  //t.throws(coalesce(args..), 'Expected');
  t.end();
});