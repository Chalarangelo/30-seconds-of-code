const expect = require('expect');
const curry = require('./curry.js');

test('curry is a Function', () => {
  expect(curry).toBeInstanceOf(Function);
});
test('curries a Math.pow', () => {
  expect(curry(Math.pow)(2)(10)).toBe(1024);
});
test('curries a Math.min', () => {
  expect(curry(Math.min, 3)(10)(50)(2)).toBe(2);
});
