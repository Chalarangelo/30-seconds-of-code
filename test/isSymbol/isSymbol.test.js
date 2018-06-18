const expect = require('expect');
const isSymbol = require('./isSymbol.js');


  test('isSymbol is a Function', () => {
  expect(isSymbol).toBeInstanceOf(Function);
});
  t.equal(isSymbol(Symbol('x')), true, "Checks if the given argument is a symbol");
  
