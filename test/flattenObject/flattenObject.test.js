const expect = require('expect');
const flattenObject = require('./flattenObject.js');


  test('flattenObject is a Function', () => {
  expect(flattenObject).toBeInstanceOf(Function);
});
  t.deepEqual(flattenObject({ a: { b: { c: 1 } }, d: 1 }), { 'a.b.c': 1, d: 1 }, 'Flattens an object with the paths for keys');
  t.deepEqual(flattenObject([0,1,[2,[1]],1]), { 0: 0, 1: 1, 3: 1, '2.0': 2, '2.1.0': 1 }, 'Works with arrays');
  

