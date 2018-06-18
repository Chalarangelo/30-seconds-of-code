const expect = require('expect');
const timeTaken = require('./timeTaken.js');

test('Testing timeTaken', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof timeTaken === 'function').toBeTruthy();
});
