const expect = require('expect');
const {isBrowser} = require('./_30s.js');

test('isBrowser is a Function', () => {
  expect(isBrowser).toBeInstanceOf(Function);
});
