const expect = require('expect');
const URLJoin = require('./URLJoin.js');

test('Testing URLJoin', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof URLJoin === 'function').toBeTruthy();
  expect(URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')).toBe('http://www.google.com/a/b/cd?foo=123&bar=foo');
  expect(URLJoin('file://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')).toBe('file:///www.google.com/a/b/cd?foo=123&bar=foo');
});
