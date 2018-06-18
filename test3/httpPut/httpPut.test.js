const expect = require('expect');
const httpPut = require('./httpPut.js');

test('Testing httpPut', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof httpPut === 'function').toBeTruthy();
});