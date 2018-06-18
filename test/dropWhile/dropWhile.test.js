const expect = require('expect');
const dropWhile = require('./dropWhile.js');

test('dropWhile is a Function', () => {
  expect(dropWhile).toBeInstanceOf(Function);
});
test('Removes elements in an array until the passed function returns true.', () => {
  expect(dropWhile([1, 2, 3, 4], n => n >= 3)).toEqual([3,4])
});
