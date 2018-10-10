const expect = require('expect');
const {levenshteinDistance} = require('./_30s.js');

test('levenshteinDistance is a Function', () => {
  expect(levenshteinDistance).toBeInstanceOf(Function);
});
