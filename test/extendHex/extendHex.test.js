const expect = require('expect');
const extendHex = require('./extendHex.js');


  test('extendHex is a Function', () => {
  expect(extendHex).toBeInstanceOf(Function);
});
  t.equal(extendHex('#03f'), '#0033ff', "Extends a 3-digit color code to a 6-digit color code");
  t.equal(extendHex('05a'), '#0055aa', "Extends a 3-digit color code to a 6-digit color code");
  
