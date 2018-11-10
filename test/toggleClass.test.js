const expect = require('expect');
const {toggleClass} = require('./_30s.js');

test('toggleClass is a Function', () => {
  expect(toggleClass).toBeInstanceOf(Function);
});
test('toggleClass toggles the class', () => {
  let el = document.createElement('div');
  el.classList.add('myClass');
  toggleClass(el, 'myClass');
  expect(el.classList.contains('myClass')).toBeFalsy();
});
