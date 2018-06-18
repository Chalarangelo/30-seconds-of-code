const expect = require('expect');
const defaults = require('./defaults.js');

test('defaults is a Function', () => {
  expect(defaults).toBeInstanceOf(Function);
});
test('Assigns default values for undefined properties', () => {
  expect(defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 })).toBe({ a: 1, b: 2 });
});
