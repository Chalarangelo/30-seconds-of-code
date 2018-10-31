const expect = require('expect');
const {once} = require('./_30s.js');

test('once is a Function', () => {
  expect(once).toBeInstanceOf(Function);
});
test('once is a Function', () => {
  expect(typeof once(x => 10)).toBe('function');
});
