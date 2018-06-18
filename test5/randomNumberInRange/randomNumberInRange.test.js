const expect = require('expect');
const randomNumberInRange = require('./randomNumberInRange.js');

test('Testing randomNumberInRange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof randomNumberInRange === 'function').toBeTruthy();
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  expect(typeof randomNumberInRange(lowerLimit,upperLimit) === 'number').toBeTruthy();
  const numberForTest = randomNumberInRange(lowerLimit,upperLimit);
  expect((numberForTest >= lowerLimit) && (numberForTest <= upperLimit)).toBeTruthy();
});
