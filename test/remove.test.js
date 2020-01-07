const {remove} = require('./_30s.js');

test('remove is a Function', () => {
  expect(remove).toBeInstanceOf(Function);
});
test('Removes elements from an array for which the given function returns true', () => {
  const arr = [1, 2, 3, 4];
  remove(arr, n => n % 2 === 0);

  expect(arr).toEqual([1, 3]);
});
test('Returns an array of all removed elements', () => {
  expect(remove([1, 2, 3, 4], n => n % 2 === 0)).toEqual([2, 4]);
});
