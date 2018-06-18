const expect = require('expect');
const capitalize = require('./capitalize.js');

test('capitalize is a Function', () => {
  expect(capitalize).toBeInstanceOf(Function);
});
test('Capitalizes the first letter of a string', () => {
  expect(capitalize('fooBar')).toBe('FooBar');
});
test('Capitalizes the first letter of a string', () => {
  expect(capitalize('fooBar', true)).toBe('FooBar');
});
test('Works with characters', () => {
  expect(capitalize('#!#', true)).toBe('#!#');
});
test('"Works with single character words', () => {
  expect(capitalize('a', true)).toBe('A');
});
