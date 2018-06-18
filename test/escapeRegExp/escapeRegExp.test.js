const expect = require('expect');
const escapeRegExp = require('./escapeRegExp.js');


  test('escapeRegExp is a Function', () => {
  expect(escapeRegExp).toBeInstanceOf(Function);
});
  t.equal(escapeRegExp('(test)'), '\\(test\\)', "Escapes a string to use in a regular expression");
  
