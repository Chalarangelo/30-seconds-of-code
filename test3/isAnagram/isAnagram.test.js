const expect = require('expect');
const isAnagram = require('./isAnagram.js');

test('Testing isAnagram', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isAnagram === 'function').toBeTruthy();
  expect(isAnagram('iceman', 'cinema')).toBeTruthy();
  expect(isAnagram('rail safety', 'fairy tales')).toBeTruthy();
  expect(isAnagram('roast beef', 'eat for BSE')).toBeTruthy();
  expect(isAnagram('Regera Dowdy', 'E. G. Deadworry')).toBeTruthy();
});
