const expect = require('expect');
const bubbleSort = require('./bubbleSort.js');

test('bubbleSort is a Function', () => {
  expect(bubbleSort).toBeInstanceOf(Function);
});
test('Sort the following array [[44, 11, 7, 20, 12, 90, 35, 5]]', () => {
  expect(bubbleSort([44, 11, 7, 20, 12, 90, 35, 5])).toBe([5,7,11,12,20,35,44,90]);
});
