const test = require('tape');
const digitize = require('./digitize.js');

test('Testing digitize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof digitize === 'function', 'digitize is a Function');
  t.deepEqual(digitize(123), [1, 2, 3], "Converts a number to an array of digits");
  //t.deepEqual(digitize(args..), 'Expected');
  //t.equal(digitize(args..), 'Expected');
  //t.false(digitize(args..), 'Expected');
  //t.throws(digitize(args..), 'Expected');
  t.end();
});