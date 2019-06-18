const {stringPermutations} = require('./_30s.js');

test('stringPermutations is a Function', () => {
  expect(stringPermutations).toBeInstanceOf(Function);
});
test('Generates all stringPermutations of a string', () => {
  expect(stringPermutations('abc')).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
});
test('Works for single-letter strings', () => {
  expect(stringPermutations('a')).toEqual(['a']);
});
test('Works for empty strings', () => {
  expect(stringPermutations('')).toEqual(['']);
});
