const expect = require('expect');
const composeRight = require('./composeRight.js');

test('composeRight is a Function', () => {
  expect(composeRight).toBeInstanceOf(Function);
});
const add = (x, y) => x + y;
const square = x => x * x;
const addAndSquare = composeRight(add, square);
test('Performs left-to-right function composition', () => {
  expect(addAndSquare(1, 2)).toBe(9);
});
