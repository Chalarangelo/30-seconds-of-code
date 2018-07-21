const expect = require('expect');
const initializeOrderedArray = require('./initializeOrderedArray.js');

test('initializeOrderedArray is a Function', () => {
  expect(initializeOrderedArray).toBeInstanceOf(Function);
});
test('Initializes a ordered array of given width and value', () => {
  expect(initializeOrderedArray(5)).toEqual([0,1,2,3,4]);
});
