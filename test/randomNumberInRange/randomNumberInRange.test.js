const expect = require('expect');
const randomNumberInRange = require('./randomNumberInRange.js');


  test('randomNumberInRange is a Function', () => {
  expect(randomNumberInRange).toBeInstanceOf(Function);
});
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  test('The returned value is a number', () => {
  expect(typeof randomNumberInRange(lowerLimit,upperLimit) === 'number').toBeTruthy();
});
  const numberForTest = randomNumberInRange(lowerLimit,upperLimit);
  test('The returned value lies between provided lowerLimit and upperLimit (both inclusive).', () => {
  expect((numberForTest >= lowerLimit) && (numberForTest <= upperLimit)).toBeTruthy();
});
  

