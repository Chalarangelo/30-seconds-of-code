const expect = require('expect');
const removeNonASCII = require('./removeNonASCII.js');

test('Testing removeNonASCII', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof removeNonASCII === 'function').toBeTruthy();
  expect(removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ')).toBe('lorem-ipsum');
});
