const {minN} = require('./_30s.js');

test('minN is a Function', () => {
  expect(minN).toBeInstanceOf(Function);
});
test('Returns the n minimum elements from the provided array', () => {
  expect(minN([1, 2, 3])).toEqual([1]);
});
test('Returns the n minimum elements from the provided array', () => {
  expect(minN([1, 2, 3], 2)).toEqual([1, 2]);
});
