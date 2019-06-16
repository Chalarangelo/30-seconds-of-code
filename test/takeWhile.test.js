const {takeWhile} = require('./_30s.js');

test('takeWhile is a Function', () => {
  expect(takeWhile).toBeInstanceOf(Function);
});
test('Removes elements until the function returns true', () => {
  expect(takeWhile([1, 2, 3, 4], n => n >= 3)).toEqual([1, 2]);
});
test('Removes elements until the function returns true', () => {
  expect(takeWhile([1, 2, 3, 4], n => false)).toEqual([1, 2, 3, 4]);
});
