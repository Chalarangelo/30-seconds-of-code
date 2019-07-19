const {isInteger} = require('./_30s.js');

test('isInteger is a Function', () => {
  expect(isInteger).toBeInstanceOf(Function);
});
test('passed argument is a number', () => {
  expect(isInteger(1)).toBeTruthy();
});
test('passed argument is a number', () => {
  expect(isInteger(1.0)).toBeTruthy();
});
test('passed argument is a number', () => {
  expect(isInteger(1.1)).toBeFalsy();
});
test('passed argument is not a number', () => {
  expect(isInteger('1')).toBeFalsy();
});
test('passed argument is not a number', () => {
  expect(isInteger(NaN)).toBeFalsy();
});
