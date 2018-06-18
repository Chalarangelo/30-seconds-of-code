const expect = require('expect');
const radsToDegrees = require('./radsToDegrees.js');

test('radsToDegrees is a Function', () => {
  expect(radsToDegrees).toBeInstanceOf(Function);
});
test('Returns the appropriate value', () => {
  expect(radsToDegrees(Math.PI / 2)).toBe(90);
});
