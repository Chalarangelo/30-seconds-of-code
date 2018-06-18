const expect = require('expect');
const deepClone = require('./deepClone.js');

test('deepClone is a Function', () => {
  expect(deepClone).toBeInstanceOf(Function);
});
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a);
const c = [{foo: "bar"}];
const d = deepClone(c);
test('Shallow cloning works', () => {
  expect(a).not.toEqual(b);
});
test('Deep cloning works', () => {
  expect(a.obj).not.toEqual(b.obj);
});
test('Array shallow cloning works', () => {
  expect(c).not.toEqual(d);
});
test('Array deep cloning works', () => {
  expect(c[0]).not.toEqual(d[0]);
});
