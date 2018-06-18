const expect = require('expect');
const scrollToTop = require('./scrollToTop.js');

test('Testing scrollToTop', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof scrollToTop === 'function').toBeTruthy();
});
