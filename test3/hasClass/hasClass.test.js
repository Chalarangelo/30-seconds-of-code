const expect = require('expect');
const hasClass = require('./hasClass.js');

test('Testing hasClass', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hasClass === 'function').toBeTruthy();
});