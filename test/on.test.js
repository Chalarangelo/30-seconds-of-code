const {on} = require('./_30s.js');

test('on is a Function', () => {
  expect(on).toBeInstanceOf(Function);
});
test('on creates an event listener', () => {
  let el = document.createElement('div');
  let val = false;
  const fn = () => val = true;
  on(el, 'click', fn);
  var clickEvent = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  el.dispatchEvent(clickEvent);
  expect(val).toBeTruthy();
});
test('on creates an event listener', () => {
  let el = document.createElement('div');
  document.body.appendChild(el);
  let val = false;
  const fn = () => val = true;
  on(document.body, 'click', fn, { target: 'div' });
  var clickEvent = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  el.dispatchEvent(clickEvent);
  expect(val).toBeTruthy();
});
