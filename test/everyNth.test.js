const expect = require('expect');
const {everyNth} = require('./_30s.js');

test('everyNth is a Function', () => {
  expect(everyNth).toBeInstanceOf(Function);
});
test('Returns every nth element in an array', () => {
  expect(everyNth([1, 2, 3, 4, 5, 6], 2)).toEqual([2, 4, 6]);
});
