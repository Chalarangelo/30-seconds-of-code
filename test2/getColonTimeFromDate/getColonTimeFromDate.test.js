const expect = require('expect');
const getColonTimeFromDate = require('./getColonTimeFromDate.js');

test('Testing getColonTimeFromDate', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getColonTimeFromDate === 'function').toBeTruthy();
});