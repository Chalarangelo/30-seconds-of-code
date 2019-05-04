const expect = require('expect');
const {intersectionWith} = require('./_30s.js');

test('intersectionWith is a Function', () => {
  expect(intersectionWith).toBeInstanceOf(Function);
});
test('Returns a list of elements that exist in both arrays, using a provided comparator function', () => {
  expect(
    intersectionWith(
      [1, 1.2, 1.5, 3, 0],
      [1.9, 3, 0, 3.9],
      (a, b) => Math.round(a) === Math.round(b)
    )
  ).toEqual([1.5, 3, 0]);
});
