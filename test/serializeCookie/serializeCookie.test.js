const expect = require('expect');
const serializeCookie = require('./serializeCookie.js');


  test('serializeCookie is a Function', () => {
  expect(serializeCookie).toBeInstanceOf(Function);
});
  t.equal(serializeCookie('foo', 'bar'), 'foo=bar', 'Serializes the cookie');
  

