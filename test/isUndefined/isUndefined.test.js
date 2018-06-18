const expect = require('expect');
const isUndefined = require('./isUndefined.js');


  test('isUndefined is a Function', () => {
  expect(isUndefined).toBeInstanceOf(Function);
});
  test('Returns true for undefined', () => {
  expect(isUndefined(undefined)).toBeTruthy();
});
  

