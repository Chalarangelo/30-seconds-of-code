const expect = require('expect');
const mostPerformant = require('./mostPerformant.js');

test('Testing mostPerformant', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof mostPerformant === 'function').toBeTruthy();
});
