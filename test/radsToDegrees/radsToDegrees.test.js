const test = require('tape');
const radsToDegrees = require('./radsToDegrees.js');

test('Testing radsToDegrees', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof radsToDegrees === 'function', 'radsToDegrees is a Function');
  t.equal(radsToDegrees(Math.PI / 2), 90, 'Returns the appropriate value');
  //t.deepEqual(radsToDegrees(args..), 'Expected');
  //t.equal(radsToDegrees(args..), 'Expected');
  //t.false(radsToDegrees(args..), 'Expected');
  //t.throws(radsToDegrees(args..), 'Expected');
  t.end();
});
