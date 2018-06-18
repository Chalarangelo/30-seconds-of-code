const expect = require('expect');
const reduceSuccessive = require('./reduceSuccessive.js');

test('Testing reduceSuccessive', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof reduceSuccessive === 'function').toBeTruthy();
  expect(reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0)).toEqual([0, 1, 3, 6, 10, 15, 21]);
});
