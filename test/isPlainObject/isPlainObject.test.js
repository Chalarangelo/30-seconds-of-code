const expect = require('expect');
const isPlainObject = require('./isPlainObject.js');


  test('isPlainObject is a Function', () => {
  expect(isPlainObject).toBeInstanceOf(Function);
});
  t.equal(isPlainObject({ a: 1 }), true, 'Returns true for a plain object');
  t.equal(isPlainObject(new Map()), false, 'Returns false for a Map (example of non-plain object)');
  

