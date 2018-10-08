const expect = require('expect');
const isNumber = require('./isNumber.js');

test('isNumber is a Function', () => {
  expect(isNumber).toBeInstanceOf(Function);
});
test('passed argument is a number', () => {
  expect(isNumber(1)).toBeTruthy();
});
test('passed argument is not a number', () => {
  expect(isNumber('1')).toBeFalsy();
});
