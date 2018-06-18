const expect = require('expect');
const shallowClone = require('./shallowClone.js');

test('Testing shallowClone', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof shallowClone === 'function').toBeTruthy();
  const a = { foo: 'bar', obj: { a: 1, b: 2 } };
  const b = shallowClone(a);
  expect(a).not.toBe(b);
  expect(a.obj).toBe(b.obj);
});
