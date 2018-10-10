const expect = require('expect');
const {insertBefore} = require('./_30s.js');

test('insertBefore is a Function', () => {
  expect(insertBefore).toBeInstanceOf(Function);
});
