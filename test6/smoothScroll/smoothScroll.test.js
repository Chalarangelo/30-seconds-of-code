const expect = require('expect');
const smoothScroll = require('./smoothScroll.js');

test('Testing smoothScroll', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof smoothScroll === 'function').toBeTruthy();
});