const expect = require('expect');
const {once} = require('./_30s.js');

test('once is a Function', () => {
  expect(once).toBeInstanceOf(Function);
});
test('once returns Function', () => {
  expect(typeof once(x => 10)).toBe('function');
});
test('once returns the result only once', () => {
  let onced = once(x => x);
  expect(onced(10)).toBe(10);
  expect(onced(10)).toBe(undefined);
});
