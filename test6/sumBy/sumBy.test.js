const expect = require('expect');
const sumBy = require('./sumBy.js');

test('Testing sumBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sumBy === 'function').toBeTruthy();
});