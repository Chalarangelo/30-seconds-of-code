const expect = require('expect');
const {sortedIndexBy} = require('./_30s.js');

test('sortedIndexBy is a Function', () => {
  expect(sortedIndexBy).toBeInstanceOf(Function);
});
test('Returns the lowest index to insert the element without messing up the list order', () => {
  expect(sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)).toBe(0);
});
test('Returns the lowest index to insert the element without messing up the list order', () => {
  expect(sortedIndexBy([{ x: 5 }, { x: 4 }], { x: 4 }, o => o.x)).toBe(1);
});
test('Returns the lowest index to insert the element without messing up the list order', () => {
  expect(sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 6 }, o => o.x)).toBe(2);
});
