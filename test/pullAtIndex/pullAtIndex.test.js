const test = require('tape');
const pullAtIndex = require('./pullAtIndex.js');

test('Testing pullAtIndex', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pullAtIndex === 'function', 'pullAtIndex is a Function');
  //t.deepEqual(pullAtIndex(args..), 'Expected');
  //t.equal(pullAtIndex(args..), 'Expected');
  //t.false(pullAtIndex(args..), 'Expected');
  //t.throws(pullAtIndex(args..), 'Expected');
  t.end();
});