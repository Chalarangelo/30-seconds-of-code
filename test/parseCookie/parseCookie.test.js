const expect = require('expect');
const parseCookie = require('./parseCookie.js');


  test('parseCookie is a Function', () => {
  expect(parseCookie).toBeInstanceOf(Function);
});
  t.deepEqual(parseCookie('foo=bar; equation=E%3Dmc%5E2'), { foo: 'bar', equation: 'E=mc^2' }, 'Parses the cookie');
  

