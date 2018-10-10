const expect = require('expect');
const {countVowels} = require('./_30s.js');

test('countVowels is a Function', () => {
  expect(countVowels).toBeInstanceOf(Function);
});
