const expect = require('expect');
const ary = require('./ary.js');

test('ary is a Function', () => {
  expect(ary).toBeInstanceOf(Function);
});
const firstTwoMax = ary(Math.max, 2);
test('Discards arguments with index >=n', () => {
  expect([[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x))).toEqual([6, 8, 10]);
});
