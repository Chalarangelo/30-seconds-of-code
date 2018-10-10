const expect = require('expect');
const {redirect} = require('./_30s.js');

test('redirect is a Function', () => {
  expect(redirect).toBeInstanceOf(Function);
});
