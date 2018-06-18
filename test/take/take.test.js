const expect = require('expect');
const take = require('./take.js');

test('take is a Function', () => {
  expect(take).toBeInstanceOf(Function);
});
test('Returns an array with n elements removed from the beginning.', () => {
  expect(take([1, 2, 3], 5), [1, 2).toEqual(3])
});
test('Returns an array with n elements removed from the beginning.', () => {
  expect(take([1, 2, 3], 0)).toEqual([])
});
