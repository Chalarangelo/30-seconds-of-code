const expect = require('expect');
const memoize = require('./memoize.js');


  test('memoize is a Function', () => {
  expect(memoize).toBeInstanceOf(Function);
});
  const f = x => x * x;
  const square = memoize(f);
  test('Function works properly', () => {
  expect(square(2), 4).toBe()
});
  test('Function works properly', () => {
  expect(square(3), 9).toBe()
});
  test('Cache stores values', () => {
  expect(Array.from(square.cache), [[2,4],[3,9]]).toEqual()
});
  

