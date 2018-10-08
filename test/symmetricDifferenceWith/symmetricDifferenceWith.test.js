const expect = require('expect');
const symmetricDifferenceWith = require('./symmetricDifferenceWith.js');

test('symmetricDifferenceWith is a Function', () => {
  expect(symmetricDifferenceWith).toBeInstanceOf(Function);
});
test('Returns the symmetric difference between two arrays, using a provided function as a comparator', () => {
  expect(
    symmetricDifferenceWith(
      [1, 1.2, 1.5, 3, 0],
      [1.9, 3, 0, 3.9],
      (a, b) => Math.round(a) === Math.round(b)
    )
  ).toEqual([1, 1.2, 3.9]);
});
