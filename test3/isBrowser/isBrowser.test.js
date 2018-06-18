const expect = require('expect');
const isBrowser = require('./isBrowser.js');

test('Testing isBrowser', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isBrowser === 'function').toBeTruthy();
});