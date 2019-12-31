const {isPowerOfTwo} = require('./_30s.js');

test('isPowerOfTwo is a Function', () => {
  expect(isPowerOfTwo).toBeInstanceOf(Function);
});
test('0 is not a power of 2', () => {
  expect(isPowerOfTwo(0)).toBeFalsy();
});
test('1 is a power of 2', () => {
  expect(isPowerOfTwo(1)).toBeTruthy();
});
test('2 is a power of 2', () => {
  expect(isPowerOfTwo(2)).toBeTruthy();
});
test('3 is not a power of 2', () => {
  expect(isPowerOfTwo(3)).toBeFalsy();
});
test('4 is a power of 2', () => {
  expect(isPowerOfTwo(4)).toBeTruthy();
});
test('5 is not a power of 2', () => {
  expect(isPowerOfTwo(5)).toBeFalsy();
});
test('6 is not a power of 2', () => {
  expect(isPowerOfTwo(6)).toBeFalsy();
});
test('undefined is not a power of 2', () => {
  expect(isPowerOfTwo()).toBeFalsy();
});
