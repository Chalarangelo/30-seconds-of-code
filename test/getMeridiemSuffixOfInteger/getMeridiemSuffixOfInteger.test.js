const test = require('tape');
const getMeridiemSuffixOfInteger = require('./getMeridiemSuffixOfInteger.js');

test('Testing getMeridiemSuffixOfInteger', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof getMeridiemSuffixOfInteger === 'function', 'getMeridiemSuffixOfInteger is a Function');
  //t.deepEqual(getMeridiemSuffixOfInteger(args..), 'Expected');
  //t.equal(getMeridiemSuffixOfInteger(args..), 'Expected');
  //t.false(getMeridiemSuffixOfInteger(args..), 'Expected');
  //t.throws(getMeridiemSuffixOfInteger(args..), 'Expected');
  t.end();
});