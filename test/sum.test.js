const {sum} = require('./_30s.js');

test('sum is a Function', () => {
  expect(sum).toBeInstanceOf(Function);
});
test('Returns the sum of two or more numbers/arrays.', () => {
  expect(sum(...[1, 2, 3, 4])).toBe(10);
});
