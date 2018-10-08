const expect = require('expect');
const insertBefore = require('./insertBefore.js');

test('insertBefore is a Function', () => {
  expect(insertBefore).toBeInstanceOf(Function);
});
