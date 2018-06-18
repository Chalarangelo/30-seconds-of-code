const expect = require('expect');
const differenceBy = require('./differenceBy.js');

test('Testing differenceBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof differenceBy === 'function').toBeTruthy();
  expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
  expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)).toEqual([ { x: 2 } ]);
});
