const {pullAtIndex} = require('./_30s.js');

test('pullAtIndex is a Function', () => {
  expect(pullAtIndex).toBeInstanceOf(Function);
});
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtIndex(myArray, [1, 3]);
test('Pulls the given values', () => {
  expect(myArray).toEqual(['a', 'c']);
});
test('Pulls the given values', () => {
  expect(pulled).toEqual(['b', 'd']);
});
