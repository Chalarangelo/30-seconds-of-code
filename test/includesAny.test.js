const {includesAny} = require('./_30s.js');

test('any is a Function', () => {
  expect(includesAny).toBeInstanceOf(Function);
});
test('Returns true when values contains one element of arr', () => {
  expect(includesAny([0, 1, 2, 3], [1, 10, 20])).toBe(true);
});
test('Returns false when values contains none of arr elements', () => {
  expect(includesAny([0, 1, 2, 3], [10, 20, 30])).toBe(false);
});
test('Returns false when values is an empty array', () => {
  expect(includesAny([0, 1, 2, 3], [])).toBe(false);
});
