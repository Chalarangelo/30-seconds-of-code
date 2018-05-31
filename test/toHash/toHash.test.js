const test = require('tape');
const toHash = require('./toHash.js');

test('Testing toHash', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toHash === 'function', 'toHash is a Function');
  //t.deepEqual(toHash(args..), 'Expected');
  //t.equal(toHash(args..), 'Expected');
  //t.false(toHash(args..), 'Expected');
  //t.throws(toHash(args..), 'Expected');
  t.end();
});