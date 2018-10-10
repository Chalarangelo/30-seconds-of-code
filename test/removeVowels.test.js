const expect = require('expect');
const {removeVowels} = require('./_30s.js');

test('removeVowels is a Function', () => {
  expect(removeVowels).toBeInstanceOf(Function);
});
