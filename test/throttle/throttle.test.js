const test = require('tape');
const throttle = require('./throttle.js');

test('Testing throttle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof throttle === 'function', 'throttle is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(throttle(args..), 'Expected');
  //t.equal(throttle(args..), 'Expected');
  //t.false(throttle(args..), 'Expected');
  //t.throws(throttle(args..), 'Expected');
  t.end();
});
