const test = require('tape');
const unionWith = require('./unionWith.js');

test('Testing unionWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unionWith === 'function', 'unionWith is a Function');
  t.deepEqual(unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)), [1, 1.2, 1.5, 3, 0, 3.9], 'Produces the appropriate results');
  //t.deepEqual(unionWith(args..), 'Expected');
  //t.equal(unionWith(args..), 'Expected');
  //t.false(unionWith(args..), 'Expected');
  //t.throws(unionWith(args..), 'Expected');
  t.end();
});
