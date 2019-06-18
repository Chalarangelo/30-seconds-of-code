const {intersection} = require('./_30s.js');

test('intersection is a Function', () => {
  expect(intersection).toBeInstanceOf(Function);
});
test('Returns a list of elements that exist in both arrays', () => {
  expect(intersection([1, 2, 3], [4, 3, 2])).toEqual([2, 3]);
});
