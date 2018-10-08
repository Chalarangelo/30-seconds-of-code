const expect = require('expect');
const isArray = require('./isArray.js');

test('isArray is a Function', () => {
  expect(isArray).toBeInstanceOf(Function);
});
test('passed value is an array', () => {
  expect(isArray([1])).toBeTruthy();
});
test('passed value is not an array', () => {
  expect(isArray('array')).toBeFalsy();
});
