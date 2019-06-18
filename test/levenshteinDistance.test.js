const {levenshteinDistance} = require('./_30s.js');

test('levenshteinDistance is a Function', () => {
  expect(levenshteinDistance).toBeInstanceOf(Function);
});
test('levenshteinDistance returns the correct results', () => {
  expect(levenshteinDistance('30-seconds-of-code', '30-seconds-of-python-code')).toBe(7);
});
test('levenshteinDistance returns the correct result for 0-length string as first argument', () => {
  expect(levenshteinDistance('', 'foo')).toBe(3);
});
test('levenshteinDistance returns the correct result for 0-length string as second argument', () => {
  expect(levenshteinDistance('bar', '')).toBe(3);
});
