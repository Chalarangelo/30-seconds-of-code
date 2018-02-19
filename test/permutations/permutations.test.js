const test = require('tape');
const permutations = require('./permutations.js');

test('Testing permutations', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof permutations === 'function', 'permutations is a Function');
  t.deepEqual(permutations([1, 33, 5]), [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ], 'Generates all permutations of an array');
  //t.deepEqual(permuteAll(args..), 'Expected');
  //t.equal(permuteAll(args..), 'Expected');
  //t.false(permuteAll(args..), 'Expected');
  //t.throws(permuteAll(args..), 'Expected');
  t.end();
});
