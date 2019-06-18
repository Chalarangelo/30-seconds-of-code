const {objectToPairs} = require('./_30s.js');

test('objectToPairs is a Function', () => {
  expect(objectToPairs).toBeInstanceOf(Function);
});
test('Creates an array of key-value pair arrays from an object.', () => {
  expect(objectToPairs({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
});
