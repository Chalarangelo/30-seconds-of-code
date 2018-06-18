const expect = require('expect');
const differenceBy = require('./differenceBy.js');

test('differenceBy is a Function', () => {
  expect(differenceBy).toBeInstanceOf(Function);
});
test('Works using a native function and numbers', () => {
  expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual( [1.2]);
});
test('Works with arrow function and objects', () => {
  expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)).toEqual([ { x: 2 } ]);
});
