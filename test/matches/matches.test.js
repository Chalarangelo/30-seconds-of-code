const test = require('tape');
const matches = require('./matches.js');

test('Testing matches', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof matches === 'function', 'matches is a Function');
  //t.deepEqual(matches(args..), 'Expected');
  //t.equal(matches(args..), 'Expected');
  //t.false(matches(args..), 'Expected');
  //t.throws(matches(args..), 'Expected');
  t.end();
});