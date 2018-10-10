const expect = require('expect');
const {isAbsoluteURL} = require('./_30s.js');

test('isAbsoluteURL is a Function', () => {
  expect(isAbsoluteURL).toBeInstanceOf(Function);
});
test('Given string is an absolute URL', () => {
  expect(isAbsoluteURL('https://google.com')).toBeTruthy();
});
test('Given string is an absolute URL', () => {
  expect(isAbsoluteURL('ftp://www.myserver.net')).toBeTruthy();
});
test('Given string is not an absolute URL', () => {
  expect(isAbsoluteURL('/foo/bar')).toBeFalsy();
});
