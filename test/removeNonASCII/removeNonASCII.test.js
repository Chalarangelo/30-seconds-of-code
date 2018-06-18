const expect = require('expect');
const removeNonASCII = require('./removeNonASCII.js');


  test('removeNonASCII is a Function', () => {
  expect(removeNonASCII).toBeInstanceOf(Function);
});
  t.equal(removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'), 'lorem-ipsum', 'Removes non-ASCII characters');
  

