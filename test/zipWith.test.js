const {zipWith} = require('./_30s.js');

test('zipWith is a Function', () => {
  expect(zipWith).toBeInstanceOf(Function);
});
test('zipWith returns the correct results', () => {
  expect(zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)).toEqual([111, 222]);
});
test('zipWith returns the correct results if no function is passed', () => {
  expect(zipWith([1, 2], [10, 20], [100, 200])).toEqual([[1, 10, 100], [2, 20, 200]]);
});
