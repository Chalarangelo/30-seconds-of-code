const expect = require('expect');
const {randomIntArrayInRange} = require('./_30s.js');

test('randomIntArrayInRange is a Function', () => {
  expect(randomIntArrayInRange).toBeInstanceOf(Function);
});
const lowerLimit = Math.floor(Math.random() * 20);
const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
const arr = randomIntArrayInRange(lowerLimit, upperLimit, 10);
test('The returned array contains only integers', () => {
  expect(arr.every(x => typeof x === 'number')).toBeTruthy();
});
test('The returned array has the proper length', () => {
  expect(arr.length).toBe(10);
});
test("The returned array's values lie between provided lowerLimit and upperLimit (both inclusive).", () => {
  expect(arr.every(x => x >= lowerLimit && x <= upperLimit)).toBeTruthy();
});
