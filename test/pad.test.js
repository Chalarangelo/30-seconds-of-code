const {pad} = require('./_30s.js');

test('pad is a Function', () => {
  expect(pad).toBeInstanceOf(Function);
});
test('cat is padded on both sides', () => {
  expect(pad('cat', 8)).toBe('  cat   ');
});
test('length of string is 8', () => {
  expect(pad('cat', 8).length).toBe(8);
});
test('pads 42 with "0"', () => {
  expect(pad(String(42), 6, '0')).toBe('004200');
});
test('does not truncates if string exceeds length', () => {
  expect(pad('foobar', 3)).toBe('foobar');
});
