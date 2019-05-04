const expect = require('expect');
const {prefix} = require('./_30s.js');

test('prefix is a Function', () => {
  expect(prefix).toBeInstanceOf(Function);
});
test('prefix is a Function', () => {
  expect(typeof prefix('appearance')).toBe('string');
});
