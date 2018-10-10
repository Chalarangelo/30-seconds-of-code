const expect = require('expect');
const {insertAfter} = require('./_30s.js');

test('insertAfter is a Function', () => {
  expect(insertAfter).toBeInstanceOf(Function);
});
