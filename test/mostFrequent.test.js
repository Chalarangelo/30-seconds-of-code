const {mostFrequent} = require('./_30s.js');

test('mostFrequent is a Function', () => {
  expect(mostFrequent).toBeInstanceOf(Function);
});
test('returns the most frequent value', () => {
  expect(mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b'])).toBe('a');
});
