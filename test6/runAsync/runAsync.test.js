const expect = require('expect');
const runAsync = require('./runAsync.js');

test('Testing runAsync', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof runAsync === 'function').toBeTruthy();
});
