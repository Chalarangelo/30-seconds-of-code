const expect = require('expect');
const {triggerEvent} = require('./_30s.js');

test('triggerEvent is a Function', () => {
  expect(triggerEvent).toBeInstanceOf(Function);
});
