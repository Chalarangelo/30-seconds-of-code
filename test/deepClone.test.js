const expect = require('expect');
const {deepClone} = require('./_30s.js');

test('deepClone is a Function', () => {
  expect(deepClone).toBeInstanceOf(Function);
});
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a);
const c = [{ foo: 'bar' }];
const d = deepClone(c);
const e = { edge: [] };
const f = deepClone(e);
test('Shallow cloning works', () => {
  expect(a).not.toBe(b);
});
test('Deep cloning works', () => {
  expect(a.obj).not.toBe(b.obj);
});
test('Array shallow cloning works', () => {
  expect(c).not.toBe(d);
});
test('Array deep cloning works', () => {
  expect(c[0]).not.toBe(d[0]);
});
test('Array shallow cloning edge case works', () => {
  expect(f.edge).toEqual([]);
});
