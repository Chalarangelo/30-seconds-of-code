const expect = require('expect');
const redirect = require('./redirect.js');

test('redirect is a Function', () => {
  expect(redirect).toBeInstanceOf(Function);
});
