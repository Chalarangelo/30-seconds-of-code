const expect = require('expect');
const isFunction = require('./isFunction.js');

test('isFunction is a Function', () => {
  expect(isFunction).toBeInstanceOf(Function);
});
test('passed value is a function', () => {
  expect(isFunction(x => x)).toBeTruthy();
});
test('passed value is not a function', () => {
  expect(isFunction('x')).toBeFalsy();
});
  
