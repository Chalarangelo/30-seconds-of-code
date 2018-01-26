const test = require('tape');
const isSet = require('./isSet.js');

test('Testing isSet', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isSet === 'function', 'isSet is a Function');
  //t.deepEqual(isSet(args..), 'Expected');
  //t.equal(isSet(args..), 'Expected');
  //t.false(isSet(args..), 'Expected');
  //t.throws(isSet(args..), 'Expected');
  t.end();
});