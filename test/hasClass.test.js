const {hasClass} = require('./_30s.js');

test('hasClass is a Function', () => {
  expect(hasClass).toBeInstanceOf(Function);
});
test('hasClass returns the proper value', () => {
  let el = document.createElement('div');
  el.classList.add('myClass');
  expect(hasClass(el, 'myClass')).toBeTruthy();
});
