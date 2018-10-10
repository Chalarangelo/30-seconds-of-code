const expect = require('expect');
const {elementIsVisibleInViewport} = require('./_30s.js');

test('elementIsVisibleInViewport is a Function', () => {
  expect(elementIsVisibleInViewport).toBeInstanceOf(Function);
});
