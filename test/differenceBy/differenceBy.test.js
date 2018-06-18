const expect = require('expect');
const differenceBy = require('./differenceBy.js');


  test('differenceBy is a Function', () => {
  expect(differenceBy).toBeInstanceOf(Function);
});
  t.deepEqual(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor), [1.2], 'Works using a native function and numbers');
  t.deepEqual(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x), [ { x: 2 } ], 'Works with arrow function and objects');
  

