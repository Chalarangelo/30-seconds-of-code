const test = require('tape');
const unfold = require('./unfold.js');

test('Testing unfold', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unfold === 'function', 'unfold is a Function');
  //t.deepEqual(unfold(args..), 'Expected');
  //t.equal(unfold(args..), 'Expected');
  //t.false(unfold(args..), 'Expected');
  //t.throws(unfold(args..), 'Expected');
  t.end();
});