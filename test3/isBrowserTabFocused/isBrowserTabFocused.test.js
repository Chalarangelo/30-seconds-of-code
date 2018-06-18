const expect = require('expect');
const isBrowserTabFocused = require('./isBrowserTabFocused.js');

test('Testing isBrowserTabFocused', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isBrowserTabFocused === 'function').toBeTruthy();
});