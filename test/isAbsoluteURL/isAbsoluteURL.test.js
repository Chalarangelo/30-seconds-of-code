const expect = require('expect');
const isAbsoluteURL = require('./isAbsoluteURL.js');


  test('isAbsoluteURL is a Function', () => {
  expect(isAbsoluteURL).toBeInstanceOf(Function);
});
  t.equal(isAbsoluteURL('https:
  t.equal(isAbsoluteURL('ftp:
  t.equal(isAbsoluteURL('/foo/bar'), false, "Given string is not an absolute URL");
  
