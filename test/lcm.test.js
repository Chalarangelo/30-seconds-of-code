const expect = require('expect');
const {lcm} = require('./_30s.js');

test('lcm is a Function', () => {
  expect(lcm).toBeInstanceOf(Function);
});
test('Returns the least common multiple of two or more numbers.', () => {
  expect(lcm(12, 7)).toBe(84);
});
test('Returns the least common multiple of two or more numbers.', () => {
  expect(lcm(...[1, 3, 4, 5])).toBe(60);
});
