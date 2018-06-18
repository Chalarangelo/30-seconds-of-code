const expect = require('expect');
const unionBy = require('./unionBy.js');

test('Testing unionBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unionBy === 'function').toBeTruthy();
  expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
});
