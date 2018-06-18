const expect = require('expect');
const yesNo = require('./yesNo.js');

test('yesNo is a Function', () => {
  expect(yesNo).toBeInstanceOf(Function);
});
test('yesNo(Y) returns true', () => {
  expect(yesNo('Y')).toBeTruthy();
});
test('yesNo(yes) returns true', () => {
  expect(yesNo('yes')).toBeTruthy();
});
test('yesNo(foo, true) returns true', () => {
  expect(yesNo('foo', true)).toBeTruthy();
});
test('yesNo(No) returns false', () => {
  expect(yesNo('No')).toBeFalsy();
});
test('yesNo() returns false', () => {
  expect(yesNo()).toBeFalsy();
});
test('yesNo(null) returns false', () => {
  expect(yesNo(null)).toBeFalsy();
});
test('yesNo(undefined) returns false', () => {
  expect(yesNo(undefined)).toBeFalsy();
});
test('yesNo([123, null]) returns false', () => {
  expect(yesNo([123, null])).toBeFalsy();
});
test('yesNo([Yes, No]) returns false', () => {
  expect(yesNo(['Yes', 'No'])).toBeFalsy();
});
test('yesNo({ 2: Yes }) returns false', () => {
  expect(yesNo({ 2: 'Yes' })).toBeFalsy();
});
test('yesNo([Yes, No], true) returns true', () => {
  expect(yesNo(['Yes', 'No'], true)).toBeTruthy();
});
test('yesNo({ 2: Yes }, true) returns true', () => {
  expect(yesNo({ 2: 'Yes' }, true)).toBeTruthy();
});
