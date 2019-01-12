const expect = require('expect');
const {deepClone} = require('./_30s.js');

test('deepClone is a Function', () => {
  expect(deepClone).toBeInstanceOf(Function);
});
const data = {
  a: [],
  b: [1, 2, 3],
  c: [{ foo: 'bar' }],
  d: {},
  e: { a: 'a', b: 'b', c: 'c', d: ['a', 'b', 'c'] },
  f: 1,
  g: true
};
const dupe = deepClone(data);
test('Shallow cloning works', () => {
  expect(data).not.toBe(dupe);
});
test('Array shallow cloning edge case works', () => {
  expect(dupe.a).toEqual([]);
});
test('Array shallow cloning works', () => {
  expect(data.b).not.toBe(dupe.b);
});
test('Array deep cloning works', () => {
  expect(data.c[0]).not.toBe(dupe.c[0]);
});
test('Deep cloning works', () => {
  expect(data.d).not.toBe(dupe.d);
  expect(data.e).not.toBe(dupe.e);
});
test('Cloning primitives works', () => {
  expect(data.f).toBe(dupe.f);
  expect(data.g).toBe(dupe.g);
});
