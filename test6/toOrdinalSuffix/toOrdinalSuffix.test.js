const expect = require('expect');
const toOrdinalSuffix = require('./toOrdinalSuffix.js');

test('Testing toOrdinalSuffix', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toOrdinalSuffix === 'function').toBeTruthy();
  expect(toOrdinalSuffix('123')).toBe('123rd');
  expect(toOrdinalSuffix(5)).toBe('5th');
  expect(toOrdinalSuffix(1)).toBe('1st');
  expect(toOrdinalSuffix(0)).toBe('0th');
});