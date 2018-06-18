const expect = require('expect');
const sample = require('./sample.js');

test('Testing sample', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sample === 'function').toBeTruthy();
  const arr = [3,7,9,11];
  expect(arr.includes(sample(arr))).toBeTruthy();
  expect(sample([1])).toBe(1);
  expect(sample([])).toBe(undefined);
});
