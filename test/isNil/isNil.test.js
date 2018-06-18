const expect = require('expect');
const isNil = require('./isNil.js');


  test('isNil is a Function', () => {
  expect(isNil).toBeInstanceOf(Function);
});
  t.equal(isNil(null), true, 'Returns true for null');
  t.equal(isNil(undefined), true, 'Returns true for undefined');
  t.equal(isNil(''), false, 'Returns false for an empty string');
  

