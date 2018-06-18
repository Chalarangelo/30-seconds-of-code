const expect = require('expect');
const randomIntegerInRange = require('./randomIntegerInRange.js');

test('Testing randomIntegerInRange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof randomIntegerInRange === 'function').toBeTruthy();
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  expect(Number.isInteger(randomIntegerInRange(lowerLimit,upperLimit))).toBeTruthy();
  const numberForTest = randomIntegerInRange(lowerLimit,upperLimit);
  expect((numberForTest >= lowerLimit) && (numberForTest <= upperLimit)).toBeTruthy();
});
