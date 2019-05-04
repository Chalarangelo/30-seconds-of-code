const expect = require('expect');
const {getMeridiemSuffixOfInteger} = require('./_30s.js');

test('getMeridiemSuffixOfInteger is a Function', () => {
  expect(getMeridiemSuffixOfInteger).toBeInstanceOf(Function);
});
test('Gets the correct meridiem suffix.', () => {
  expect(getMeridiemSuffixOfInteger(0)).toEqual('12am');
});
test('Gets the correct meridiem suffix.', () => {
  expect(getMeridiemSuffixOfInteger(11)).toEqual('11am');
});
test('Gets the correct meridiem suffix.', () => {
  expect(getMeridiemSuffixOfInteger(12)).toEqual('12pm');
});
test('Gets the correct meridiem suffix.', () => {
  expect(getMeridiemSuffixOfInteger(13)).toEqual('1pm');
});
test('Gets the correct meridiem suffix.', () => {
  expect(getMeridiemSuffixOfInteger(25)).toEqual('1pm');
});
