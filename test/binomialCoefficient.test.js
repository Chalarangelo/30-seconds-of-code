const expect = require('expect');
const {binomialCoefficient} = require('./_30s.js');

test('binomialCoefficient is a Function', () => {
  expect(binomialCoefficient).toBeInstanceOf(Function);
});
test('Returns the appropriate value', () => {
  expect(binomialCoefficient(8, 2)).toBe(28);
});
test('Returns the appropriate value', () => {
  expect(binomialCoefficient(0, 0)).toBe(1);
});
test('Returns the appropriate value', () => {
  expect(binomialCoefficient(5, 3)).toBe(10);
});
test('Returns the appropriate value', () => {
  expect(binomialCoefficient(8, -1)).toBe(0);
});
test('Returns the appropriate value', () => {
  expect(binomialCoefficient(8, 1)).toBe(8);
});
test('Returns NaN', () => {
  expect(Number.isNaN(binomialCoefficient(NaN, 3))).toBeTruthy();
});
test('Returns NaN', () => {
  expect(Number.isNaN(binomialCoefficient(5, NaN))).toBeTruthy();
});
