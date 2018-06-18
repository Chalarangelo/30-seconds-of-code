const expect = require('expect');
const isPrimitive = require('./isPrimitive.js');

test('Testing isPrimitive', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isPrimitive === 'function').toBeTruthy();
  expect(isPrimitive(null)).toBeTruthy();
  expect(isPrimitive(undefined)).toBeTruthy();
  expect(isPrimitive('string')).toBeTruthy();
  expect(isPrimitive(true)).toBeTruthy();
  expect(isPrimitive(50)).toBeTruthy();
  expect(isPrimitive('Hello')).toBeTruthy();
  expect(isPrimitive(false)).toBeTruthy();
  expect(isPrimitive(Symbol())).toBeTruthy();
  expect(isPrimitive([1, 2, 3])).toBeFalsy();
  expect(isPrimitive({ a: 123 })).toBeFalsy();

  let start = new Date().getTime();
  isPrimitive({ a: 123 });
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});