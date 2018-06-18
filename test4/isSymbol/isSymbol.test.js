const expect = require('expect');
const isSymbol = require('./isSymbol.js');

test('Testing isSymbol', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isSymbol === 'function').toBeTruthy();
  expect(isSymbol(Symbol('x'))).toBe(true);
});