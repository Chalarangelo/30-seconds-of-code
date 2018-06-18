const expect = require('expect');
const getType = require('./getType.js');


  test('getType is a Function', () => {
  expect(getType).toBeInstanceOf(Function);
});
  t.equal(getType(new Set([1, 2, 3])), 'set', "Returns the native type of a value");
  
