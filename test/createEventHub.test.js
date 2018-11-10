const expect = require('expect');
const {createEventHub} = require('./_30s.js');

test('createEventHub is a Function', () => {
  expect(createEventHub).toBeInstanceOf(Function);
});
test('createEventHub returns an object', () => {
  let hub = createEventHub();
  expect(typeof hub).toBe('object');
  expect(typeof hub.hub).toBe('object');
  expect(hub.emit).toBeInstanceOf(Function);
  expect(hub.on).toBeInstanceOf(Function);
  expect(hub.off).toBeInstanceOf(Function);
  expect(hub.emit()).toBe(undefined);
  expect(hub.on()).toBe(undefined);
  expect(hub.off()).toBe(undefined);
});
