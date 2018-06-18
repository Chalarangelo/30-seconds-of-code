const expect = require('expect');
const escapeRegExp = require('./escapeRegExp.js');

test('escapeRegExp is a Function', () => {
  expect(escapeRegExp).toBeInstanceOf(Function);
});
test('Escapes a string to use in a regular expression', () => {
  expect(escapeRegExp('(test)')).toBe('\\(test\\)')
});  
