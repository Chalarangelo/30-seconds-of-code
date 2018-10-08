const expect = require('expect');
const groupBy = require('./groupBy.js');

test('groupBy is a Function', () => {
  expect(groupBy).toBeInstanceOf(Function);
});
test('Groups the elements of an array based on the given function', () => {
  expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: [4.2], 6: [6.1, 6.3] });
});
test('Groups the elements of an array based on the given function', () => {
  expect(groupBy(['one', 'two', 'three'], 'length')).toEqual({ 3: ['one', 'two'], 5: ['three'] });
});
