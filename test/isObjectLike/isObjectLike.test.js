const expect = require('expect');
const isObjectLike = require('./isObjectLike.js');


  test('isObjectLike is a Function', () => {
  expect(isObjectLike).toBeInstanceOf(Function);
});
  test('Returns true for an object', () => {
  expect(isObjectLike({}), true).toBe()
});
  test('Returns true for an array', () => {
  expect(isObjectLike([1, 2, 3]), true).toBe()
});
  test('Returns false for a function', () => {
  expect(isObjectLike(x => x), false).toBe()
});
  test('Returns false for null', () => {
  expect(isObjectLike(null), false).toBe()
});
  

