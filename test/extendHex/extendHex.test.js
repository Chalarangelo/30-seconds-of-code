const expect = require('expect');
const extendHex = require('./extendHex.js');

test('extendHex is a Function', () => {
  expect(extendHex).toBeInstanceOf(Function);
});
test('Extends a 3-digit color code to a 6-digit color code', () => {
  expect(extendHex('#03f')).toBe('#0033ff');
});
test('Extends a 3-digit color code to a 6-digit color code', () => {
  expect(extendHex('05a')).toBe('#0055aa');
});
