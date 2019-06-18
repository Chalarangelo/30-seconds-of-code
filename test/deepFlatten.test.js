const {deepFlatten} = require('./_30s.js');

test('deepFlatten is a Function', () => {
  expect(deepFlatten).toBeInstanceOf(Function);
});
test('Deep flattens an array', () => {
  expect(deepFlatten([1, [2], [[3], 4], 5])).toEqual([1, 2, 3, 4, 5]);
});
