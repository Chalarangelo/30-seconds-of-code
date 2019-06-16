const {sumPower} = require('./_30s.js');

test('sumPower is a Function', () => {
  expect(sumPower).toBeInstanceOf(Function);
});
test('Returns the sum of the powers of all the numbers from start to end', () => {
  expect(sumPower(10)).toBe(385);
});
test('Returns the sum of the powers of all the numbers from start to end', () => {
  expect(sumPower(10, 3)).toBe(3025);
});
test('Returns the sum of the powers of all the numbers from start to end', () => {
  expect(sumPower(10, 3, 5)).toBe(2925);
});
