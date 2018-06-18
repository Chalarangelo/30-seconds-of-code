const expect = require('expect');
const createEventHub = require('./createEventHub.js');

test('createEventHub is a Function', () => {
  expect(createEventHub).toBeInstanceOf(Function);
});
