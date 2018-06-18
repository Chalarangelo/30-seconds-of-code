const expect = require('expect');
const parseCookie = require('./parseCookie.js');

test('Testing parseCookie', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof parseCookie === 'function').toBeTruthy();
  expect(parseCookie('foo=bar; equation=E%3Dmc%5E2')).toEqual({ foo: 'bar', equation: 'E=mc^2' });
});
