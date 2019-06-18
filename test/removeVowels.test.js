const {removeVowels} = require('./_30s.js');

test('removeVowels is a Function', () => {
  expect(removeVowels).toBeInstanceOf(Function);
});
test('Removes vowels.', () => {
  expect(removeVowels('foobAr')).toBe('fbr');
});
test('Replaces vowels.', () => {
  expect(removeVowels('foobAr', '*')).toBe('f**b*r');
});
