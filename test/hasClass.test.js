const expect = require('expect');
const {hasClass} = require('./_30s.js');

test('hasClass is a Function', () => {
  expect(hasClass).toBeInstanceOf(Function);
});
