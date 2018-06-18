const expect = require('expect');
const countVowels = require('./countVowels.js');

test('countVowels is a Function', () => {
  expect(countVowels).toBeInstanceOf(Function);
});
