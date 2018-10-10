const expect = require('expect');
const {removeNonASCII} = require('./_30s.js');

test('removeNonASCII is a Function', () => {
  expect(removeNonASCII).toBeInstanceOf(Function);
});
test('Removes non-ASCII characters', () => {
  expect(removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ')).toBe('lorem-ipsum');
});
