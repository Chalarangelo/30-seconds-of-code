const {currentURL} = require('./_30s.js');

test('currentURL is a Function', () => {
  expect(currentURL).toBeInstanceOf(Function);
});
test('currentURL returns the appropriate value', () => {
  expect(currentURL()).toEqual(global.location.href);
});
