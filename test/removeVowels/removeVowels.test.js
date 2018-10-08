const expect = require('expect');
const removeVowels = require('./removeVowels.js');

test('removeVowels is a Function', () => {
  expect(removeVowels).toBeInstanceOf(Function);
});
