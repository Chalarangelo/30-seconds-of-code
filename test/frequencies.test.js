const {frequencies} = require('./_30s.js');

test('frequencies is a Function', () => {
  expect(frequencies).toBeInstanceOf(Function);
});
test('returns the appropriate object', () => {
  expect(frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b'])).toEqual({ a: 4, b: 2, c: 1 });
});
