const {unflattenObject} = require('./_30s.js');

test('unflattenObject is a Function', () => {
  expect(unflattenObject).toBeInstanceOf(Function);
});
test('Unflattens an object with the paths for keys', () => {
  expect(unflattenObject({ 'a.b.c': 1, d: 1 })).toEqual({ a: { b: { c: 1 } }, d: 1 });
});
