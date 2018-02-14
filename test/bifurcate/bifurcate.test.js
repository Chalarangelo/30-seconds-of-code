const test = require('tape');
const bifurcate = require('./bifurcate.js');

test('Testing bifurcate', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bifurcate === 'function', 'bifurcate is a Function');
  t.deepEqual(bifurcate([ 'beep', 'boop', 'foo', 'bar' ], [ true, true, false, true ]), [ ['beep', 'boop', 'bar'], ['foo'] ], 'Splits the collection into two groups');
  //t.deepEqual(bifurcate(args..), 'Expected');
  //t.equal(bifurcate(args..), 'Expected');
  //t.false(bifurcate(args..), 'Expected');
  //t.throws(bifurcate(args..), 'Expected');
  t.end();
});
