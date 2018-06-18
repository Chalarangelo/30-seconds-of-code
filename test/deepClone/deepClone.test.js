const expect = require('expect');
const deepClone = require('./deepClone.js');

test('Testing deepClone', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof deepClone === 'function').toBeTruthy();
  const a = { foo: 'bar', obj: { a: 1, b: 2 } };
  const b = deepClone(a);
  const c = [{foo: "bar"}];
  const d = deepClone(c);
  expect(a).not.toBe(b);
  expect(a.obj).not.toBe(b.obj);
  expect(c).not.toBe(d);
  expect(c[0]).not.toBe(d[0]);
});
