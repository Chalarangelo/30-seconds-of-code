const {isOdd} = require('./_30s.js');

test('isOdd is a Function', () => {
  expect(isOdd).toBeInstanceOf(Function);
});
test('4 is not an odd number', () => {
  expect(isOdd(4)).toBeFalsy();
});
test('5 is an odd number', () => {
  expect(isOdd(5)).toBeTruthy();
});
