const expect = require('expect');
const isAnagram = require('./isAnagram.js');

test('isAnagram is a Function', () => {
  expect(isAnagram).toBeInstanceOf(Function);
});
test('Checks valid anagram', () => {
  expect(isAnagram('iceman', 'cinema')).toBeTruthy();
});
test('Works with spaces', () => {
  expect(isAnagram('rail safety', 'fairy tales')).toBeTruthy();
});
test('Ignores case', () => {
  expect(isAnagram('roast beef', 'eat for BSE')).toBeTruthy();
});
test('Ignores special characters', () => {
  expect(isAnagram('Regera Dowdy', 'E. G. Deadworry')).toBeTruthy();
});
