const expect = require('expect');
const sampleSize = require('./sampleSize.js');

test('Testing sampleSize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sampleSize === 'function').toBeTruthy();
  const arr = [3,7,9,11];
  expect(sampleSize(arr).length).toBe(1);
  expect(sampleSize(arr, 2).every(x => arr.includes(x))).toBeTruthy();
  expect(sampleSize(arr, 5).length).toBe(4);
  expect(sampleSize([], 2)).toEqual([]);
  expect(sampleSize(arr, 0)).toEqual([]);
});
