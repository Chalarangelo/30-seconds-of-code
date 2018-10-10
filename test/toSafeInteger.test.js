const expect = require('expect');
const {toSafeInteger} = require('./_30s.js');

test('toSafeInteger is a Function', () => {
  expect(toSafeInteger).toBeInstanceOf(Function);
});
test('Number(toSafeInteger(3.2)) is a number', () => {
  expect(Number(toSafeInteger(3.2))).toBeTruthy();
});
test('Converts a value to a safe integer', () => {
  expect(toSafeInteger(3.2)).toBe(3);
});
test("toSafeInteger('4.2') returns 4", () => {
  expect(toSafeInteger('4.2')).toBe(4);
});
test('toSafeInteger(4.6) returns 5', () => {
  expect(toSafeInteger(4.6)).toBe(5);
});
test('toSafeInteger([]) returns 0', () => {
  expect(toSafeInteger([])).toBe(0);
});
test('isNaN(toSafeInteger([1.5, 3124])) is true', () => {
  expect(isNaN(toSafeInteger([1.5, 3124]))).toBeTruthy();
});
test("isNaN(toSafeInteger('string')) is true", () => {
  expect(isNaN(toSafeInteger('string'))).toBeTruthy();
});
test('isNaN(toSafeInteger({})) is true', () => {
  expect(isNaN(toSafeInteger({}))).toBeTruthy();
});
test('isNaN(toSafeInteger()) is true', () => {
  expect(isNaN(toSafeInteger())).toBeTruthy();
});
test('toSafeInteger(Infinity) returns 9007199254740991', () => {
  expect(toSafeInteger(Infinity)).toBe(9007199254740991);
});
let start = new Date().getTime();
toSafeInteger(3.2);
let end = new Date().getTime();
test('toSafeInteger(3.2) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
