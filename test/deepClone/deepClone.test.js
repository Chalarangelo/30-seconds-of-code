const expect = require('expect');
const deepClone = require('./deepClone.js');


  test('deepClone is a Function', () => {
  expect(deepClone).toBeInstanceOf(Function);
});
  const a = { foo: 'bar', obj: { a: 1, b: 2 } };
  const b = deepClone(a);
  const c = [{foo: "bar"}];
  const d = deepClone(c);
  t.notEqual(a, b, 'Shallow cloning works');
  t.notEqual(a.obj, b.obj, 'Deep cloning works');
  t.notEqual(c, d, "Array shallow cloning works");
  t.notEqual(c[0], d[0], "Array deep cloning works");
  

