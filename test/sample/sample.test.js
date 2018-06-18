const expect = require('expect');
const sample = require('./sample.js');


  test('sample is a Function', () => {
  expect(sample).toBeInstanceOf(Function);
});
  const arr = [3,7,9,11];
  test('Returns a random element from the array', () => {
  expect(arr.includes(sample(arr))).toBeTruthy();
});
  test('Works for single-element arrays', () => {
  expect(sample([1]), 1).toBe()
});
  test('Returns undefined for empty array', () => {
  expect(sample([]), undefined).toBe()
});
  

