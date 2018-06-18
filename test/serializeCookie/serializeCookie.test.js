const expect = require('expect');
const serializeCookie = require('./serializeCookie.js');

test('serializeCookie is a Function', () => {
  expect(serializeCookie).toBeInstanceOf(Function);
});
test('Serializes the cookie', () => {
  expect(serializeCookie('foo', 'bar')).toBe('foo=bar');
});
