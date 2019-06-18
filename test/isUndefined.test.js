const {isUndefined} = require('./_30s.js');

test('isUndefined is a Function', () => {
  expect(isUndefined).toBeInstanceOf(Function);
});
test('Returns true for undefined', () => {
  expect(isUndefined(undefined)).toBeTruthy();
});
