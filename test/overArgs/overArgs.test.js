const test = require('tape');
const overArgs = require('./overArgs.js');

test('Testing overArgs', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof overArgs === 'function', 'overArgs is a Function');
  //t.deepEqual(overArgs(args..), 'Expected');
  //t.equal(overArgs(args..), 'Expected');
  //t.false(overArgs(args..), 'Expected');
  //t.throws(overArgs(args..), 'Expected');
  t.end();
});