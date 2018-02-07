const test = require('tape');
const unionBy = require('./unionBy.js');

test('Testing unionBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unionBy === 'function', 'unionBy is a Function');
  t.deepEqual(unionBy([2.1], [1.2, 2.3], Math.floor), [2.1, 1.2], 'Produces the appropriate results');
  //t.deepEqual(unionBy(args..), 'Expected');
  //t.equal(unionBy(args..), 'Expected');
  //t.false(unionBy(args..), 'Expected');
  //t.throws(unionBy(args..), 'Expected');
  t.end();
});
