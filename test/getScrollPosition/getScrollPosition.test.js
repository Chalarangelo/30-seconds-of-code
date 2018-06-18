const expect = require('expect');
const getScrollPosition = require('./getScrollPosition.js');

test('getScrollPosition is a Function', () => {
  expect(getScrollPosition).toBeInstanceOf(Function);
});
