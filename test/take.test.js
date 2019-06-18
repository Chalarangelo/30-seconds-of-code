const {take} = require('./_30s.js');

test('take is a Function', () => {
  expect(take).toBeInstanceOf(Function);
});
test('Returns an array with n elements removed from the beginning.', () => {
  expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
});
test('Returns an array with n elements removed from the beginning.', () => {
  expect(take([1, 2, 3], 0)).toEqual([]);
});
test('Returns an array with n elements removed from the beginning.', () => {
  expect(take([1, 2, 3])).toEqual([1]);
});
