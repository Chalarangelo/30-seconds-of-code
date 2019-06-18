const {getStyle} = require('./_30s.js');

test('getStyle is a Function', () => {
  expect(getStyle).toBeInstanceOf(Function);
});
test('getStyle returns the proper value', () => {
  let el = document.createElement('div');
  el.setAttribute('style', 'font-size: 20px;');
  expect(getStyle(el, 'font-size')).toBe('20px');
});
