const expect = require('expect');
const {defaults} = require('./_30s.js');

test('defaults is a Function', () => {
  expect(defaults).toBeInstanceOf(Function);
});
test('Assigns default values for undefined properties', () => {
  expect(defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 })).toEqual({ a: 1, b: 2 });
});
