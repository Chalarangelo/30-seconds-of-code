const expect = require('expect');
const clampNumber = require('./clampNumber.js');

test('clampNumber is a Function', () => {
  expect(clampNumber).toBeInstanceOf(Function);
});
test('Clamps num within the inclusive range specified by the boundary values a and b', () => {
  expect(clampNumber(2, 3, 5)).toBe(3);
});
