const expect = require('expect');
const isSimilar = require('./isSimilar.js');

test('Testing isSimilar', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isSimilar === 'function').toBeTruthy();
});