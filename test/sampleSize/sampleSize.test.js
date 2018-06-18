const expect = require('expect');
const sampleSize = require('./sampleSize.js');


  test('sampleSize is a Function', () => {
  expect(sampleSize).toBeInstanceOf(Function);
});
  const arr = [3,7,9,11];
  t.equal(sampleSize(arr).length, 1, 'Returns a single element without n specified');
  test('Returns a random sample of specified size from an array', () => {
  expect(sampleSize(arr, 2).every(x => arr.includes(x))).toBeTruthy();
});
  t.equal(sampleSize(arr, 5).length, 4, 'Returns all elements in an array if n >= length');
  t.deepEqual(sampleSize([], 2), [], 'Returns an empty array if original array is empty');
  t.deepEqual(sampleSize(arr, 0), [], 'Returns an empty array if n = 0');
  

