const expect = require('expect');
const off = require('./off.js');

test('off is a Function', () => {
  expect(off).toBeInstanceOf(Function);
});
