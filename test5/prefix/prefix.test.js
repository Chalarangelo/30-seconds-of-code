const expect = require('expect');
const prefix = require('./prefix.js');

test('Testing prefix', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof prefix === 'function').toBeTruthy();
});