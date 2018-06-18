const expect = require('expect');
const levenshteinDistance = require('./levenshteinDistance.js');

test('levenshteinDistance is a Function', () => {
  expect(levenshteinDistance).toBeInstanceOf(Function);
});
