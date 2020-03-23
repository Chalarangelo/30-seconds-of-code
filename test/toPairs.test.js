const {toPairs} = require('./_30s.js');

test('toPairs is a Function', () => {
  expect(toPairs).toBeInstanceOf(Function);
});
test('Creates an array of key-value pair arrays from an object.', () => {
  expect(toPairs({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
});
test('Creates an array of key-value pair arrays from an array.', () => {
  expect(toPairs([2, 4, 8])).toEqual([[0, 2], [1, 4], [2, 8]]);
});
test('Creates an array of key-value pair arrays from a string.', () => {
  expect(toPairs('shy')).toEqual([['0', 's'], ['1', 'h'], ['2', 'y']]);
});
test('Creates an array of key-value pair arrays from a set.', () => {
  expect(toPairs(new Set(['a', 'b', 'c', 'a']))).toEqual([['a', 'a'], ['b', 'b'], ['c', 'c']]);
});
