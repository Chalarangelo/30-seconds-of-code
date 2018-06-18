const expect = require('expect');
const debounce = require('./debounce.js');

test('Testing debounce', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof debounce === 'function').toBeTruthy();
  debounce(() => {}, 250);
});
