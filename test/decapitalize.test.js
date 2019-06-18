const {decapitalize} = require('./_30s.js');

test('decapitalize is a Function', () => {
  expect(decapitalize).toBeInstanceOf(Function);
});
test('Works with default parameter', () => {
  expect(decapitalize('FooBar')).toBe('fooBar');
});
test('Works with second parameter set to true', () => {
  expect(decapitalize('FooBar', true)).toBe('fOOBAR');
});
