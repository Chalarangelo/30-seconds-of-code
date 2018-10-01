const expect = require('expect');
const getCookie = require('./getCookie.js');

test('getCookie is a Function', () => {
  expect(getCookie).toBeInstanceOf(Function);
});
