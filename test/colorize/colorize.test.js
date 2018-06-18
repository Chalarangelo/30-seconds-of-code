const expect = require('expect');
const colorize = require('./colorize.js');

test('Testing colorize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof colorize === 'function').toBeTruthy();
});
