const expect = require('expect');
const {flattenObject} = require('./_30s.js');

test('flattenObject is a Function', () => {
  expect(flattenObject).toBeInstanceOf(Function);
});
test('Flattens an object with the paths for keys', () => {
  expect(flattenObject({ a: { b: { c: 1 } }, d: 1 })).toEqual({ 'a.b.c': 1, d: 1 });
});
test('Works with arrays', () => {
  expect(flattenObject([0, 1, [2, [1]], 1])).toEqual({ 0: 0, 1: 1, 3: 1, '2.0': 2, '2.1.0': 1 });
});
