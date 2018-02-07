const test = require('tape');
const isUndefined = require('./isUndefined.js');

test('Testing isUndefined', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isUndefined === 'function', 'isUndefined is a Function');
  t.true(isUndefined(undefined), 'Returns true for undefined');
  //t.deepEqual(isUndefined(args..), 'Expected');
  //t.equal(isUndefined(args..), 'Expected');
  //t.false(isUndefined(args..), 'Expected');
  //t.throws(isUndefined(args..), 'Expected');
  t.end();
});
