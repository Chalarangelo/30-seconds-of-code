const expect = require('expect');
const ary = require('./ary.js');

test('Testing ary', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof ary === 'function').toBeTruthy();
  const firstTwoMax = ary(Math.max, 2);
  expect([[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x))).toEqual([6, 8, 10]);
});
