const test = require('tape');
const delay = require('./delay.js');

test('Testing delay', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof delay === 'function', 'delay is a Function');
  //t.deepEqual(delay(args..), 'Expected');
  //t.equal(delay(args..), 'Expected');
  //t.false(delay(args..), 'Expected');
  //t.throws(delay(args..), 'Expected');
  t.end();
});