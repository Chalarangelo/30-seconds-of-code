const expect = require('expect');
const {countBy} = require('./_30s.js');

test('countBy is a Function', () => {
  expect(countBy).toBeInstanceOf(Function);
});
test('Works for functions', () => {
  expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: 1, 6: 2 });
});
test('Works for property names', () => {
  expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ 3: 2, 5: 1 });
});
