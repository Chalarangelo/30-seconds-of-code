const {howManyTimes} = require('./_30s.js');

test('howManyTimes is a Function', () => {
  expect(howManyTimes).toBeInstanceOf(Function);
});
test('howManyTimes returns the correct result', () => {
  expect(howManyTimes(100, 2)).toBe(2);
});
test('howManyTimes returns the correct result', () => {
  expect(howManyTimes(100, 2.5)).toBe(2);
});
test('howManyTimes returns the correct result', () => {
  expect(howManyTimes(100, 0)).toBe(0);
});
test('howManyTimes returns the correct result', () => {
  expect(howManyTimes(100, -1)).toBe(Infinity);
});
