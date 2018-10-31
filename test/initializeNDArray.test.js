const expect = require('expect');
const {initializeNDArray} = require('./_30s.js');

test('initializeNDArray is a Function', () => {
  expect(initializeNDArray).toBeInstanceOf(Function);
});
test('Initializes a n-D array with given data', () => {
  expect(initializeNDArray(1, 3)).toEqual([1, 1, 1]);
});
test('Initializes a n-D array with given data', () => {
  expect(initializeNDArray(5, 2, 2, 2)).toEqual([[[5, 5], [5, 5]],[[5, 5], [5, 5]]]);
});
