const expect = require('expect');
const toDecimalMark = require('./toDecimalMark.js');

test('Testing toDecimalMark', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toDecimalMark === 'function').toBeTruthy();
  expect(toDecimalMark(12305030388.9087)).toBe("12,305,030,388.909");
});