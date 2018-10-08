const expect = require('expect');
const smoothScroll = require('./smoothScroll.js');

test('smoothScroll is a Function', () => {
  expect(smoothScroll).toBeInstanceOf(Function);
});
