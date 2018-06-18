const expect = require('expect');
const castArray = require('./castArray.js');


  test('castArray is a Function', () => {
  expect(castArray).toBeInstanceOf(Function);
});
  test('Works for single values', () => {
  expect(castArray(1), [1]).toEqual()
});
  test('Works for arrays with one value', () => {
  expect(castArray([1]), [1]).toEqual()
});
  test('Works for arrays with multiple value', () => {
  expect(castArray([1,2,3]), [1,2,3]).toEqual()
});
  test('Works for strings', () => {
  expect(castArray('test'), ['test']).toEqual()
});
  test('Works for objects', () => {
  expect(castArray({}), [{}]).toEqual()
});
  

