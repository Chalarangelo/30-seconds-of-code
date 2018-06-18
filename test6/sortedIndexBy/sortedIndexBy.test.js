const expect = require('expect');
const sortedIndexBy = require('./sortedIndexBy.js');

test('Testing sortedIndexBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sortedIndexBy === 'function').toBeTruthy();
  expect(sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)).toBe(0);
});
