const expect = require('expect');
const {getScrollPosition} = require('./_30s.js');

test('getScrollPosition is a Function', () => {
  expect(getScrollPosition).toBeInstanceOf(Function);
});
