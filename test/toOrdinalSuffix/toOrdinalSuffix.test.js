const expect = require('expect');
const toOrdinalSuffix = require('./toOrdinalSuffix.js');

test('toOrdinalSuffix is a Function', () => {
  expect(toOrdinalSuffix).toBeInstanceOf(Function);
});
test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix('123')).toBe('123rd');
});
test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(5)).toBe('5th');
});
test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(1)).toBe('1st');
});
test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(0)).toBe('0th');
});
