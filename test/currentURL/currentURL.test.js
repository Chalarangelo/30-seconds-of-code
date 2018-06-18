const expect = require('expect');
const currentURL = require('./currentURL.js');

test('currentURL is a Function', () => {
  expect(currentURL).toBeInstanceOf(Function);
});
