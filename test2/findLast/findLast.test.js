const expect = require('expect');
const findLast = require('./findLast.js');

test('Testing findLast', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof findLast === 'function').toBeTruthy();
  expect(findLast([1, 2, 3, 4], n => n % 2 === 1)).toBe(3);
});
