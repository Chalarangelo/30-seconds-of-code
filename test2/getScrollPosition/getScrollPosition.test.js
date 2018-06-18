const expect = require('expect');
const getScrollPosition = require('./getScrollPosition.js');

test('Testing getScrollPosition', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getScrollPosition === 'function').toBeTruthy();
});
