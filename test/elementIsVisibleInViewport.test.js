const expect = require('expect');
const {elementIsVisibleInViewport} = require('./_30s.js');

test('elementIsVisibleInViewport is a Function', () => {
  expect(elementIsVisibleInViewport).toBeInstanceOf(Function);
});
test('elementIsVisibleInViewport returns a boolean', () => {
  let el = document.createElement('div');
  expect(typeof elementIsVisibleInViewport(el)).toBe('boolean');
});
test('elementIsVisibleInViewport returns a boolean', () => {
  let el = document.createElement('div');
  expect(typeof elementIsVisibleInViewport(el, true)).toBe('boolean');
});
