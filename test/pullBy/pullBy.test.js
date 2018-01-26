const test = require('tape');
const pullBy = require('./pullBy.js');

test('Testing pullBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pullBy === 'function', 'pullBy is a Function');
  //t.deepEqual(pullBy(args..), 'Expected');
  //t.equal(pullBy(args..), 'Expected');
  //t.false(pullBy(args..), 'Expected');
  //t.throws(pullBy(args..), 'Expected');
  t.end();
});