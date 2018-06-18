const expect = require('expect');
const overArgs = require('./overArgs.js');

test('Testing overArgs', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof overArgs === 'function').toBeTruthy();
  const square = n => n * n;
  const double = n => n * 2;
  const fn = overArgs((x, y) => [x, y], [square, double]);
  expect(fn(9, 3)).toEqual([81, 6]);
});
