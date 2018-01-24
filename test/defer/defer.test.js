const test = require('tape');
const defer = require('./defer.js');

test('Testing defer', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof defer === 'function', 'defer is a Function');
  //t.deepEqual(defer(args..), 'Expected');
  //t.equal(defer(args..), 'Expected');
  //t.false(defer(args..), 'Expected');
  //t.throws(defer(args..), 'Expected');
  t.end();
});