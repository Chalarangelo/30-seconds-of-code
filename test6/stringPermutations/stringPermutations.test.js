const expect = require('expect');
const stringPermutations = require('./stringPermutations.js');

test('Testing stringPermutations', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof stringPermutations === 'function').toBeTruthy();
  expect(stringPermutations('abc')).toEqual(['abc','acb','bac','bca','cab','cba']);
  expect(stringPermutations('a')).toEqual(['a']);
  expect(stringPermutations('')).toEqual(['']);
});
