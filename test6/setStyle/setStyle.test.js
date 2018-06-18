const expect = require('expect');
const setStyle = require('./setStyle.js');

test('Testing setStyle', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof setStyle === 'function').toBeTruthy();
});
