const expect = require('expect');
const {findLastIndex} = require('./_30s.js');

test('findLastIndex is a Function', () => {
  expect(findLastIndex).toBeInstanceOf(Function);
});
test('Finds last index for which the given function returns true', () => {
  expect(findLastIndex([1, 2, 3, 4], n => n % 2 === 1)).toBe(2);
});
