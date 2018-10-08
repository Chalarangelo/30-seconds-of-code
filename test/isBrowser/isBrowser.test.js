const expect = require('expect');
const isBrowser = require('./isBrowser.js');

test('isBrowser is a Function', () => {
  expect(isBrowser).toBeInstanceOf(Function);
});
