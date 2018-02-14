const test = require('tape');
const bifurcateBy = require('./bifurcateBy.js');

test('Testing bifurcateBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bifurcateBy === 'function', 'bifurcateBy is a Function');
  t.deepEqual(bifurcateBy([ 'beep', 'boop', 'foo', 'bar' ], x => x[0] === 'b'), [ ['beep', 'boop', 'bar'], ['foo'] ], 'Splits the collection into two groups');
  //t.deepEqual(bifurcateBy(args..), 'Expected');
  //t.equal(bifurcateBy(args..), 'Expected');
  //t.false(bifurcateBy(args..), 'Expected');
  //t.throws(bifurcateBy(args..), 'Expected');
  t.end();
});
