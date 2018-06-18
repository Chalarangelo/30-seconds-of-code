const expect = require('expect');
const takeWhile = require('./takeWhile.js');

test('takeWhile is a Function', () => {
  expect(takeWhile).toBeInstanceOf(Function);
});
test('Removes elements until the function returns true', () => {
  expect(takeWhile([1, 2, 3, 4], n => n >= 3)).toEqual([1, 2]);
});
