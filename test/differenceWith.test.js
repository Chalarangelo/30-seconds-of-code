const expect = require('expect');
const {differenceWith} = require('./_30s.js');

test('differenceWith is a Function', () => {
  expect(differenceWith).toBeInstanceOf(Function);
});
test('Filters out all values from an array', () => {
  expect(
    differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b))
  ).toEqual([1, 1.2]);
});
