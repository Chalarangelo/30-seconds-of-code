const expect = require('expect');
const binomialCoefficient = require('./binomialCoefficient.js');

test('Testing binomialCoefficient', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof binomialCoefficient === 'function').toBeTruthy();
  expect(binomialCoefficient(8, 2)).toBe(28);
  expect(binomialCoefficient(0, 0)).toBe(1);
  expect(binomialCoefficient(5, 3)).toBe(10);
  expect(Number.isNaN(binomialCoefficient(NaN, 3))).toBeTruthy();
  expect(Number.isNaN(binomialCoefficient(5, NaN))).toBeTruthy();
});
