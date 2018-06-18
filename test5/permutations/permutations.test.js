const expect = require('expect');
const permutations = require('./permutations.js');

test('Testing permutations', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof permutations === 'function').toBeTruthy();
  expect(permutations([1, 33, 5])).toEqual(
    [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
  );
});
