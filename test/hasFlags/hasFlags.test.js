const expect = require('expect');
const hasFlags = require('./hasFlags.js');

test('hasFlags is a Function', () => {
  expect(hasFlags).toBeInstanceOf(Function);
});
