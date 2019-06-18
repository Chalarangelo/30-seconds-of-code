const {transform} = require('./_30s.js');

test('transform is a Function', () => {
  expect(transform).toBeInstanceOf(Function);
});
test('Transforms an object', () => {
  expect(
    transform(
      { a: 1, b: 2, c: 1 },
      (r, v, k) => {
        (r[v] || (r[v] = [])).push(k);
        return r;
      },
      {}
    )
  ).toEqual({ '1': ['a', 'c'], '2': ['b'] });
});
