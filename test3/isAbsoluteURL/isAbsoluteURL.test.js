const expect = require('expect');
const isAbsoluteURL = require('./isAbsoluteURL.js');

test('Testing isAbsoluteURL', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isAbsoluteURL === 'function').toBeTruthy();
  expect(isAbsoluteURL('https://google.com')).toBe(true);
  expect(isAbsoluteURL('ftp://www.myserver.net')).toBe(true);
  expect(isAbsoluteURL('/foo/bar')).toBe(false);
});