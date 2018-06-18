const expect = require('expect');
const speechSynthesis = require('./speechSynthesis.js');

test('Testing speechSynthesis', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof speechSynthesis === 'function').toBeTruthy();
});