const expect = require('expect');
const {serializeCookie} = require('./_30s.js');

test('serializeCookie is a Function', () => {
  expect(serializeCookie).toBeInstanceOf(Function);
});
test('Serializes the cookie', () => {
  expect(serializeCookie('foo', 'bar')).toBe('foo=bar');
});
