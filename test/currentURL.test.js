const expect = require('expect');
const {currentURL} = require('./_30s.js');

test('currentURL is a Function', () => {
  expect(currentURL).toBeInstanceOf(Function);
});
