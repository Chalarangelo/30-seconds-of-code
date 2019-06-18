const {isBrowser} = require('./_30s.js');

test('isBrowser is a Function', () => {
  expect(isBrowser).toBeInstanceOf(Function);
});
test('isBrowser is a Function', () => {
  expect(typeof isBrowser()).toBe('boolean');
});
