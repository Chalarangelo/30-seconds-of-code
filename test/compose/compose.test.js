const expect = require('expect');
const compose = require('./compose.js');

test('Testing compose', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof compose === 'function').toBeTruthy();
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = compose(add5, multiply);
  expect(multiplyAndAdd5(5, 2)).toBe(15);
});