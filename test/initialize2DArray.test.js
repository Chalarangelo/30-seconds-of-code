const expect = require('expect');
const {initialize2DArray} = require('./_30s.js');

test('initialize2DArray is a Function', () => {
  expect(initialize2DArray).toBeInstanceOf(Function);
});
test('Initializes a 2D array of given width and height and value', () => {
  expect(initialize2DArray(2, 2, 0)).toEqual([[0, 0], [0, 0]]);
});
