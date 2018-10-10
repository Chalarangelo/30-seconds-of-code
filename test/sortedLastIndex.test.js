const expect = require('expect');
const {sortedLastIndex} = require('./_30s.js');

test('sortedLastIndex is a Function', () => {
  expect(sortedLastIndex).toBeInstanceOf(Function);
});
test('Returns the highest index to insert the element without messing up the list order', () => {
  expect(sortedLastIndex([10, 20, 30, 30, 40], 30)).toBe(4);
});
