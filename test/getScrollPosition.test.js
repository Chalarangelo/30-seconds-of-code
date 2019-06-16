const {getScrollPosition} = require('./_30s.js');

test('getScrollPosition is a Function', () => {
  expect(getScrollPosition).toBeInstanceOf(Function);
});
test('getScrollPosition returns an object with x and y values', () => {
  let scrollPos = getScrollPosition();
  expect(typeof scrollPos.x).toBe('number');
  expect(typeof scrollPos.y).toBe('number');
});
test('getScrollPosition returns an object with x and y values', () => {
  let el = document.createElement('div');
  let scrollPos = getScrollPosition(el);
  expect(typeof scrollPos.x).toBe('number');
  expect(typeof scrollPos.y).toBe('number');
});
