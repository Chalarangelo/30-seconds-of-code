const expect = require('expect');
const {parseCookie} = require('./_30s.js');

test('parseCookie is a Function', () => {
  expect(parseCookie).toBeInstanceOf(Function);
});
test('Parses the cookie', () => {
  expect(parseCookie('foo=bar; equation=E%3Dmc%5E2')).toEqual({ foo: 'bar', equation: 'E=mc^2' });
});
