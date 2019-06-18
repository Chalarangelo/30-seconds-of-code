const {over} = require('./_30s.js');

test('over is a Function', () => {
  expect(over).toBeInstanceOf(Function);
});
const minMax = over(Math.min, Math.max);
test('Applies given functions over multiple arguments', () => {
  expect(minMax(1, 2, 3, 4, 5)).toEqual([1, 5]);
});
