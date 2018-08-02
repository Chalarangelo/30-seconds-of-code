const expect = require('expect');
const insertAfter = require('./insertAfter.js');

test('insertAfter is a Function', () => {
  expect(insertAfter).toBeInstanceOf(Function);
});
