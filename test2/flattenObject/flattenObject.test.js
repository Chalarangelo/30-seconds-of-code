const expect = require('expect');
const flattenObject = require('./flattenObject.js');

test('Testing flattenObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof flattenObject === 'function').toBeTruthy();
  expect(flattenObject({ a: { b: { c: 1 } }, d: 1 })).toEqual({ 'a.b.c': 1, d: 1 });
  expect(flattenObject([0,1,[2,[1]],1])).toEqual({ 0: 0, 1: 1, 3: 1, '2.0': 2, '2.1.0': 1 });
});
