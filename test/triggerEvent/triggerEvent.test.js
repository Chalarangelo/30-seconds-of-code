const expect = require('expect');
const triggerEvent = require('./triggerEvent.js');

test('triggerEvent is a Function', () => {
  expect(triggerEvent).toBeInstanceOf(Function);
});