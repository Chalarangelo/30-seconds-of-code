const expect = require('expect');
const {isSymbol} = require('./_30s.js');

test('isSymbol is a Function', () => {
  expect(isSymbol).toBeInstanceOf(Function);
});
test('Checks if the given argument is a symbol', () => {
  expect(isSymbol(Symbol('x'))).toBeTruthy();
});
