const expect = require('expect');
const sample = require('./sample.js');


  test('sample is a Function', () => {
  expect(sample).toBeInstanceOf(Function);
});
  const arr = [3,7,9,11];
  test('Returns a random element from the array', () => {
  expect(arr.includes(sample(arr))).toBeTruthy();
});
  t.equal(sample([1]), 1, 'Works for single-element arrays');
  t.equal(sample([]), undefined, 'Returns undefined for empty array');
  

