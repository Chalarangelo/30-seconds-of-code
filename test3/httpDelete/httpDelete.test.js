const expect = require('expect');
const httpDelete = require('./httpDelete.js');

test('Testing httpDelete', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof httpDelete === 'function').toBeTruthy();
});