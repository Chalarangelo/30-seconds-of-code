const expect = require('expect');
const shallowClone = require('./shallowClone.js');


  test('shallowClone is a Function', () => {
  expect(shallowClone).toBeInstanceOf(Function);
});
  const a = { foo: 'bar', obj: { a: 1, b: 2 } };
  const b = shallowClone(a);
  t.notEqual(a, b, 'Shallow cloning works');
  t.equal(a.obj, b.obj, 'Does not clone deeply');
  

