const expect = require('expect');
const URLJoin = require('./URLJoin.js');

test('URLJoin is a Function', () => {
  expect(URLJoin).toBeInstanceOf(Function);
});
test('Returns proper URL', () => {
  expect(URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')).toBe('http://www.google.com/a/b/cd?foo=123&bar=foo');
});
test('Returns proper URL', () => {
  expect(URLJoin('file://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')).toBe('file:///www.google.com/a/b/cd?foo=123&bar=foo');
});
