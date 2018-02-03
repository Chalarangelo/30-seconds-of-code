const test = require('tape');
const unfold = require('./unfold.js');

test('Testing unfold', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unfold === 'function', 'unfold is a Function');
  var f = n => (n > 50 ? false : [-n, n + 10]);
  t.deepEqual(unfold(f, 10), [-10, -20, -30, -40, -50], 'Works with a given function, producing an array');
  //t.deepEqual(unfold(args..), 'Expected');
  //t.equal(unfold(args..), 'Expected');
  //t.false(unfold(args..), 'Expected');
  //t.throws(unfold(args..), 'Expected');
  t.end();
});
