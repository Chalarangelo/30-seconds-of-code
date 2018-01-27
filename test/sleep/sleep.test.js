const test = require('tape');
const sleep = require('./sleep.js');

test('Testing sleep', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sleep === 'function', 'sleep is a Function');
  //t.deepEqual(sleep(args..), 'Expected');
  //t.equal(sleep(args..), 'Expected');
  //t.false(sleep(args..), 'Expected');
  //t.throws(sleep(args..), 'Expected');
  t.end();
});