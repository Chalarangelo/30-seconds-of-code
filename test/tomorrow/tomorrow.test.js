const test = require('tape');
const tomorrow = require('./tomorrow.js');

test('Testing tomorrow', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof tomorrow === 'function', 'tomorrow is a Function');
  //t.deepEqual(tomorrow(args..), 'Expected');
  //t.equal(tomorrow(args..), 'Expected');
  //t.false(tomorrow(args..), 'Expected');
  //t.throws(tomorrow(args..), 'Expected');
  t.end();
});