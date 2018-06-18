const expect = require('expect');
const randomIntArrayInRange = require('./randomIntArrayInRange.js');

test('Testing randomIntArrayInRange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof randomIntArrayInRange === 'function').toBeTruthy();
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  const arr = randomIntArrayInRange(lowerLimit,upperLimit, 10);
  expect(arr.every(x => typeof x === 'number')).toBeTruthy();
  expect(arr.length).toBe(10);
  expect(arr.every(x => (x >= lowerLimit) && (x <= upperLimit))).toBeTruthy();
});
