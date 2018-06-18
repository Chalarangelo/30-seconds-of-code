const expect = require('expect');
const nodeListToArray = require('./nodeListToArray.js');

test('Testing nodeListToArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof nodeListToArray === 'function').toBeTruthy();
});