const expect = require('expect');
const factors = require('./factors.js');

test('factors is a Function', () => {
  expect(factors).toBeInstanceOf(Function);
});
