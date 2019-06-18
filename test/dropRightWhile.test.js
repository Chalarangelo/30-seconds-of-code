const {dropRightWhile} = require('./_30s.js');

test('dropRightWhile is a Function', () => {
  expect(dropRightWhile).toBeInstanceOf(Function);
});
test('Removes elements from the end of an array until the passed function returns true.', () => {
  expect(dropRightWhile([1, 2, 3, 4], n => n < 3)).toEqual([1, 2]);
});
