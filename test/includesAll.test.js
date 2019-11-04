const {includesAll} = require('./_30s.js');

test('any is a Function', () => {
  expect(includesAll).toBeInstanceOf(Function);
});
test('Returns true when all values are included in arr', () => {
  expect(includesAll([0, 1, 2, 3], [0, 1])).toBe(true);
});
test('Returns false when one element fo values is not included in arr', () => {
  expect(includesAll([0, 1, 2, 3], [1, 2, 4])).toBe(false);
});
test('Returns false when values is larger than arr', () => {
  expect(includesAll([0, 1, 2], [0, 1, 2, 3])).toBe(false);
});
