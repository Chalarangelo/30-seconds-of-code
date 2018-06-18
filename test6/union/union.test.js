const expect = require('expect');
const union = require('./union.js');

test('Testing union', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof union === 'function').toBeTruthy();
  expect(union([1, 2, 3], [4, 3, 2])).toEqual([1, 2, 3, 4]);
  expect(union('str', 'asd')).toEqual([ 's', 't', 'r', 'a', 'd' ]);
  expect(union([[], {}], [1, 2, 3])).toEqual([[], {}, 1, 2, 3]);
  expect(union([], [])).toEqual([]);
  expect(() => union()).toThrow();
  expect(() => union(true, 'str')).toThrow();
  expect(() => union('false', true)).toThrow();
  expect(() => union(123, {})).toThrow();
  expect(() => union([], {})).toThrow();
  expect(() => union(undefined, null)).toThrow();

  let start = new Date().getTime();
  union([1, 2, 3], [4, 3, 2]);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
