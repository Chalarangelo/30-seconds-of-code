const {countVowels} = require('./_30s.js');

test('countVowels is a Function', () => {
  expect(countVowels).toBeInstanceOf(Function);
});
test('countVowels returns the correct count', () => {
  expect(countVowels('foobar')).toBe(3);
});
test('countVowels returns the correct count', () => {
  expect(countVowels('ggg')).toBe(0);
});
