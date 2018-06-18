const expect = require('expect');
const composeRight = require('./composeRight.js');

test('Testing composeRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof composeRight === 'function').toBeTruthy();
  const add = (x, y) => x + y;
  const square = x => x * x;
  const addAndSquare = composeRight(add, square);
  expect(addAndSquare(1, 2)).toBe(9);
});
