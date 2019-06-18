const {randomIntegerInRange} = require('./_30s.js');

test('randomIntegerInRange is a Function', () => {
  expect(randomIntegerInRange).toBeInstanceOf(Function);
});
const lowerLimit = Math.floor(Math.random() * 20);
const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
test('The returned value is an integer', () => {
  expect(Number.isInteger(randomIntegerInRange(lowerLimit, upperLimit))).toBeTruthy();
});
const numberForTest = randomIntegerInRange(lowerLimit, upperLimit);
test('The returned value lies between provided lowerLimit and upperLimit (both inclusive).', () => {
  expect(numberForTest >= lowerLimit && numberForTest <= upperLimit).toBeTruthy();
});
