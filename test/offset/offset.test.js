const expect = require('expect');
const offset = require('./offset.js');

test('offset is a Function', () => {
  expect(offset).toBeInstanceOf(Function);
});
test('Offset of 0 returns the same array.', () => {
  expect(offset([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
});
test('Offset > 0 returns the offsetted array.', () => {
  expect(offset([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
});
test('Offset < 0 returns the reverse offsetted array.', () => {
  expect(offset([1, 2, 3, 4, 5], -2)).toEqual([4, 5, 1, 2, 3]);
});
test('Offset greater than the length of the array returns the same array.', () => {
  expect(offset([1, 2, 3, 4, 5], 6)).toEqual([1, 2, 3, 4, 5]);
});
test('Offset less than the negative length of the array returns the same array.', () => {
  expect(offset([1, 2, 3, 4, 5], -6)).toEqual([1, 2, 3, 4, 5]);
});
test('Offsetting empty array returns an empty array.', () => {
  expect(offset([], 3)).toEqual([]);
});
