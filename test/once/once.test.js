const expect = require('expect');
const once = require('./once.js');

test('once is a Function', () => {
  expect(once).toBeInstanceOf(Function);
});
