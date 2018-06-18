const expect = require('expect');
const unflattenObject = require('./unflattenObject.js');


  test('unflattenObject is a Function', () => {
  expect(unflattenObject).toBeInstanceOf(Function);
});
  t.deepEqual(unflattenObject({ 'a.b.c': 1, d: 1 }), { a: { b: { c: 1 } }, d: 1 }, 'Unflattens an object with the paths for keys');
  

