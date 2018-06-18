const expect = require('expect');
const isLowerCase = require('./isLowerCase.js');


  test('isLowerCase is a Function', () => {
  expect(isLowerCase).toBeInstanceOf(Function);
});
  t.equal(isLowerCase('abc'), true, "passed string is a lowercase");
  t.equal(isLowerCase('a3@$'), true, "passed string is a lowercase");
  t.equal(isLowerCase('A3@$'), false, "passed value is not a lowercase");
  
