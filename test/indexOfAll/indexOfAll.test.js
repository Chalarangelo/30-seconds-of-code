const expect = require('expect');
const indexOfAll = require('./indexOfAll.js');

test('indexOfAll is a Function', () => {
  expect(indexOfAll).toBeInstanceOf(Function);
});
test('Returns all indices of val in an array', () => {
  expect(indexOfAll([1, 2, 3, 1, 2, 3], 1)).toEqual([0,3]);
});
test('Returns all indices of val in an array', () => {
  expect(indexOfAll([1, 2, 3], 4)).toEqual([]);
});
