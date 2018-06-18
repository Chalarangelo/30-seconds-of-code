const expect = require('expect');
const memoize = require('./memoize.js');

test('Testing memoize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof memoize === 'function').toBeTruthy();
  const f = x => x * x;
  const square = memoize(f);
  expect(square(2)).toBe(4);
  expect(square(3)).toBe(9);
  expect(Array.from(square.cache)).toEqual([[2,4],[3,9]]);
});
