const {intersectionBy} = require('./_30s.js');

test('intersectionBy is a Function', () => {
  expect(intersectionBy).toBeInstanceOf(Function);
});
test('Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both', () => {
  expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
});
