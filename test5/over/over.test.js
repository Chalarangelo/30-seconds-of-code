const expect = require('expect');
const over = require('./over.js');

test('Testing over', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof over === 'function').toBeTruthy();
  const minMax = over(Math.min, Math.max);
  expect(minMax(1, 2, 3, 4, 5)).toEqual([1,5]);
});
