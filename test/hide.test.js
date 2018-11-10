const expect = require('expect');
const {hide} = require('./_30s.js');

test('hide is a Function', () => {
  expect(hide).toBeInstanceOf(Function);
});
test('hide hides an element', () => {
  let el = document.createElement('div');
  el.setAttribute('style', 'display: block;');
  hide(el);
  expect(el.style.display).toBe('none');
});
