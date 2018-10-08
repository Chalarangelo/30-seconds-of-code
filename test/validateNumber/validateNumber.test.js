const expect = require('expect');
const validateNumber = require('./validateNumber.js');

test('validateNumber is a Function', () => {
  expect(validateNumber).toBeInstanceOf(Function);
});
test('validateNumber(9) returns true', () => {
  expect(validateNumber(9)).toBeTruthy();
});
test('validateNumber(234asd.slice(0, 2)) returns true', () => {
  expect(validateNumber('234asd'.slice(0, 2))).toBeTruthy();
});
test('validateNumber(1232) returns true', () => {
  expect(validateNumber(1232)).toBeTruthy();
});
test('validateNumber(1232 + 13423) returns true', () => {
  expect(validateNumber(1232 + 13423)).toBeTruthy();
});
test('validateNumber(1232 * 2342 * 123) returns true', () => {
  expect(validateNumber(1232 * 2342 * 123)).toBeTruthy();
});
test('validateNumber(1232.23423536) returns true', () => {
  expect(validateNumber(1232.23423536)).toBeTruthy();
});
test('validateNumber(234asd) returns false', () => {
  expect(validateNumber('234asd')).toBeFalsy();
});
test('validateNumber(e234d) returns false', () => {
  expect(validateNumber('e234d')).toBeFalsy();
});
test('validateNumber(false) returns false', () => {
  expect(validateNumber(false)).toBeFalsy();
});
test('validateNumber(true) returns false', () => {
  expect(validateNumber(true)).toBeFalsy();
});
test('validateNumber(null) returns false', () => {
  expect(validateNumber(null)).toBeFalsy();
});
test('validateNumber(123 * asd) returns false', () => {
  expect(validateNumber(123 * 'asd')).toBeFalsy();
});
