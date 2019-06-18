const {bottomVisible} = require('./_30s.js');

test('bottomVisible is a Function', () => {
  expect(bottomVisible).toBeInstanceOf(Function);
});
test('bottomVisible returns a boolean', () => {
  expect(typeof bottomVisible()).toBe('boolean');
});
