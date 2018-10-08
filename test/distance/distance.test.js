const expect = require('expect');
const distance = require('./distance.js');

test('distance is a Function', () => {
  expect(distance).toBeInstanceOf(Function);
});
test('Calculates the distance between two points', () => {
  expect(distance(1, 1, 2, 3)).toBeCloseTo(2.23606797749979, 5);
});
