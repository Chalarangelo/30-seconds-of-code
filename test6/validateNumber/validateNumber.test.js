const expect = require('expect');
const validateNumber = require('./validateNumber.js');

test('Testing validateNumber', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof validateNumber === 'function').toBeTruthy();
  expect(validateNumber(9)).toBeTruthy();
  expect(validateNumber('234asd'.slice(0, 2))).toBeTruthy();
  expect(validateNumber(1232)).toBeTruthy();
  expect(validateNumber(1232 + 13423)).toBeTruthy();
  expect(validateNumber(1232 * 2342 * 123)).toBeTruthy();
  expect(validateNumber(1232.23423536)).toBeTruthy();
  expect(validateNumber('234asd')).toBeFalsy();
  expect(validateNumber('e234d')).toBeFalsy();
  expect(validateNumber(false)).toBeFalsy();
  expect(validateNumber(true)).toBeFalsy();
  expect(validateNumber(null)).toBeFalsy();
  expect(validateNumber(123 * 'asd')).toBeFalsy();
});
