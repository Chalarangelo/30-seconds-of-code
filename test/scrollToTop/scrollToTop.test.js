const expect = require('expect');
const scrollToTop = require('./scrollToTop.js');

test('scrollToTop is a Function', () => {
  expect(scrollToTop).toBeInstanceOf(Function);
});
