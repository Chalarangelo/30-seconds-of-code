const expect = require('expect');
const {isAfterDate} = require('./_30s.js');

test('isAfterDate is a Function', () => {
  expect(isAfterDate).toBeInstanceOf(Function);
});
test('isAfterDate produces the correct result', () => {
  expect(isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20))).toBeTruthy();
});
test('isBeforeDate produces the correct result', () => {
  expect(isAfterDate(new Date(2010, 10, 20), new Date(2010, 10, 21))).toBeFalsy();
});
