const expect = require('expect');
const minN = require('./minN.js');

test('Testing minN', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof minN === 'function').toBeTruthy();
  expect(minN([1, 2, 3])).toEqual([1]);
  expect(minN([1, 2, 3], 2)).toEqual([1, 2]);
});