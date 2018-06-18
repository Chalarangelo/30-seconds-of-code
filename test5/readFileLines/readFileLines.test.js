const expect = require('expect');
const readFileLines = require('./readFileLines.js');

test('Testing readFileLines', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof readFileLines === 'function').toBeTruthy();
});
