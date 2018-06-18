const expect = require('expect');
const serializeCookie = require('./serializeCookie.js');

test('Testing serializeCookie', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof serializeCookie === 'function').toBeTruthy();
  expect(serializeCookie('foo', 'bar')).toBe('foo=bar');
});
