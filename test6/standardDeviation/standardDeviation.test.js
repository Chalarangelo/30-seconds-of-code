const expect = require('expect');
const standardDeviation = require('./standardDeviation.js');

test('Testing standardDeviation', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof standardDeviation === 'function').toBeTruthy();
  expect(standardDeviation([10, 2, 38, 23, 38, 23, 21])).toBe(13.284434142114991);
  expect(standardDeviation([10, 2, 38, 23, 38, 23, 21], true)).toBe(12.29899614287479);
});