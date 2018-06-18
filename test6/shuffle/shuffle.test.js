const expect = require('expect');
const shuffle = require('./shuffle.js');

test('Testing shuffle', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof shuffle === 'function').toBeTruthy();
  const arr = [1,2,3,4,5,6];
  expect(shuffle(arr)).not.toBe(arr);
  expect(shuffle(arr).every(x => arr.includes(x))).toBeTruthy();
  expect(shuffle([])).toEqual([]);
  expect(shuffle([1])).toEqual([1]);
});
