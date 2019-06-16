const {show} = require('./_30s.js');

test('show is a Function', () => {
  expect(show).toBeInstanceOf(Function);
});
test('show shows an element', () => {
  let el = document.createElement('div');
  el.setAttribute('style', 'display: none;');
  show(el);
  expect(el.style.display).not.toBe('none');
});
