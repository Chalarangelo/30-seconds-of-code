const expect = require('expect');
const {createEventHub} = require('./_30s.js');

test('createEventHub is a Function', () => {
  expect(createEventHub).toBeInstanceOf(Function);
});
