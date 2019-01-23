const expect = require('expect');
const {takeWhile} = require('./_30s.js');

test('takeWhile is a Function', () => {
  expect(takeWhile).toBeInstanceOf(Function);
});
test('Returns the first elements where the function returns true', () => {
  expect(takeWhile([1, 2, 3, 4], n => n <= 3)).toEqual([1, 2, 3]);
});
test('Returns the first elements where the function returns true', () => {
  expect(takeWhile([1, 2, 3, 4], n => true)).toEqual([1, 2, 3, 4]);
});
