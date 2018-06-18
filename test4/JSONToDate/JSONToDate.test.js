const expect = require('expect');
const JSONToDate = require('./JSONToDate.js');

test('Testing JSONToDate', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof JSONToDate === 'function').toBeTruthy();
});