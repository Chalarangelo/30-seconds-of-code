const expect = require('expect');
const {triggerEvent} = require('./_30s.js');

test('triggerEvent is a Function', () => {
  expect(triggerEvent).toBeInstanceOf(Function);
});
test('triggerEvent triggers an event', () => {
  let el = document.createElement('div');
  let val = false;
  const fn = () => val = true;
  el.addEventListener('click', fn);
  triggerEvent(el, 'click', {})
  expect(val).toBeTruthy();
});
