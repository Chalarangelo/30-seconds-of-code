const expect = require('expect');
const isAbsoluteURL = require('./isAbsoluteURL.js');


  test('isAbsoluteURL is a Function', () => {
  expect(isAbsoluteURL).toBeInstanceOf(Function);
});
  t.equal(isAbsoluteURL('https:
  t.equal(isAbsoluteURL('ftp:
  test('Given string is not an absolute URL', () => {
  expect(isAbsoluteURL('/foo/bar')).toBe(false)
});
  
