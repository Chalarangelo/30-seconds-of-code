const expect = require('expect');
const transform = require('./transform.js');


  test('transform is a Function', () => {
  expect(transform).toBeInstanceOf(Function);
});
  t.deepEqual(transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
), { '1': ['a', 'c'], '2': ['b'] }, 'Transforms an object');
  

