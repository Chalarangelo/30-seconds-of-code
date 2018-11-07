const expect = require('expect');
const {hz} = require('./_30s.js');

test('hz is a Function', () => {
  expect(hz).toBeInstanceOf(Function);
});
test('hz returns a number', () => {
  expect(typeof hz(x => x)).toBe('number');
});
test('hz returns a number', () => {
  expect(typeof hz(x => x, 10)).toBe('number');
});
