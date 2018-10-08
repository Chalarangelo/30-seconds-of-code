const expect = require('expect');
const defer = require('./defer.js');

test('defer is a Function', () => {
  expect(defer).toBeInstanceOf(Function);
});
