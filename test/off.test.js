const expect = require('expect');
const {off} = require('./_30s.js');

test('off is a Function', () => {
  expect(off).toBeInstanceOf(Function);
});
test('off removes an event listener', () => {
  let el = document.createElement('div');
  let val = false;
  const fn = () => val = true;
  el.addEventListener('click', fn);
  off(el, 'click', fn);
  var clickEvent = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  el.dispatchEvent(clickEvent);
  expect(val).toBeFalsy();
});
test('off removes an event listener', () => {
  let el = document.createElement('div');
  let val = false;
  const fn = () => val = true;
  el.addEventListener('click', fn);
  off(el, 'click', fn, {});
  var clickEvent = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  el.dispatchEvent(clickEvent);
  expect(val).toBeFalsy();
});
