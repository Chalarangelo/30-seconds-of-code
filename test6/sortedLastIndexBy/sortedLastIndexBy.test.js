const expect = require('expect');
const sortedLastIndexBy = require('./sortedLastIndexBy.js');

test('Testing sortedLastIndexBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sortedLastIndexBy === 'function').toBeTruthy();
  expect(sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)).toBe(1);
});
