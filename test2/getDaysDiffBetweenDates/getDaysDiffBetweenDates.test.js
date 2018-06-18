const expect = require('expect');
const getDaysDiffBetweenDates = require('./getDaysDiffBetweenDates.js');

test('Testing getDaysDiffBetweenDates', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getDaysDiffBetweenDates === 'function').toBeTruthy();
  expect(getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22'))).toBe(9);
});