const expect = require('expect');
const spreadOver = require('./spreadOver.js');

test('Testing spreadOver', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof spreadOver === 'function').toBeTruthy();
  const arrayMax = spreadOver(Math.max);
  expect(arrayMax([1, 2, 3])).toBe(3);
});