const expect = require('expect');
const shallowClone = require('./shallowClone.js');

test('shallowClone is a Function', () => {
  expect(shallowClone).toBeInstanceOf(Function);
});
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = shallowClone(a);
test('Shallow cloning works', () => {
  expect(a).not.toBe(b);
});
test('Does not clone deeply', () => {
  expect(a.obj).toBe(b.obj);
});
