const expect = require('expect');
const transform = require('./transform.js');

test('Testing transform', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof transform === 'function').toBeTruthy();
  expect(transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
)).toEqual({ '1': ['a', 'c'], '2': ['b'] });
});
