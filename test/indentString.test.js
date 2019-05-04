const expect = require('expect');
const {indentString} = require('./_30s.js');

test('indentString is a Function', () => {
  expect(indentString).toBeInstanceOf(Function);
});
test('indentString is a Function', () => {
  expect(indentString('Lorem\nIpsum', 2)).toBe('  Lorem\n  Ipsum');
});
test('indentString is a Function', () => {
  expect(indentString('Lorem\nIpsum', 2, '_')).toBe('__Lorem\n__Ipsum');
});
