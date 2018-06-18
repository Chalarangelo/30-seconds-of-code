const expect = require('expect');
const merge = require('./merge.js');


  test('merge is a Function', () => {
  expect(merge).toBeInstanceOf(Function);
});
  const object = {
    a: [{ x: 2 }, { y: 4 }],
    b: 1
  };
  const other = {
    a: { z: 3 },
    b: [2, 3],
    c: 'foo'
  };
  t.deepEqual(merge(object, other), { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }, 'Merges two objects');
  

