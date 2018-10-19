const expect = require('expect');
const {toggleClass} = require('./_30s.js');

test('toggleClass is a Function', () => {
  expect(toggleClass).toBeInstanceOf(Function);
});
