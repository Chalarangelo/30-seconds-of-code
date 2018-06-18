const expect = require('expect');
const isUpperCase = require('./isUpperCase.js');


  test('isUpperCase is a Function', () => {
  expect(isUpperCase).toBeInstanceOf(Function);
});
  t.equal(isUpperCase('ABC'), true, 'ABC is all upper case');
  t.equal(isUpperCase('abc'), false, 'abc is not all upper case');
  t.equal(isUpperCase('A3@$'), true, 'A3@$ is all uppercase');
  
