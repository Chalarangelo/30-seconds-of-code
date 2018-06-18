const expect = require('expect');
const sum = require('./sum.js');

test('Testing sum', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sum === 'function').toBeTruthy();
  expect(sum(...[1, 2, 3, 4])).toBe(10);
});