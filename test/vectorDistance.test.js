const expect = require('expect');
const {vectorDistance} = require('./_30s.js');

test('vectorDistance is a Function', () => {
  expect(vectorDistance).toBeInstanceOf(Function);
});
test('Calculates the distance between two vectors', () => {
  expect(distance(10,0,5,20,0,10)).toBeCloseTo(11.180339887498949, 5);
});
