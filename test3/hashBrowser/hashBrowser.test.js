const expect = require('expect');
const hashBrowser = require('./hashBrowser.js');

test('Testing hashBrowser', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hashBrowser === 'function').toBeTruthy();
});
