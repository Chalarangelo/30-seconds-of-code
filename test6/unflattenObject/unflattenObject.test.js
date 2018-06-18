const expect = require('expect');
const unflattenObject = require('./unflattenObject.js');

test('Testing unflattenObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unflattenObject === 'function').toBeTruthy();
  expect(unflattenObject({ 'a.b.c': 1, d: 1 })).toEqual({ a: { b: { c: 1 } }, d: 1 });
});
