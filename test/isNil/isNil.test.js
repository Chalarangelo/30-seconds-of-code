const test = require('tape');
const isNil = require('./isNil.js');

test('Testing isNil', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isNil === 'function', 'isNil is a Function');
  //t.deepEqual(isNil(args..), 'Expected');
  //t.equal(isNil(args..), 'Expected');
  //t.false(isNil(args..), 'Expected');
  //t.throws(isNil(args..), 'Expected');
  t.end();
});