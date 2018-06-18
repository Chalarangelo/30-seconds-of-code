const expect = require('expect');
const pipeFunctions = require('./pipeFunctions.js');

test('Testing pipeFunctions', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pipeFunctions === 'function').toBeTruthy();
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = pipeFunctions(multiply, add5);
  expect(multiplyAndAdd5(5, 2)).toBe(15);
});
