const expect = require('expect');
const toggleClass = require('./toggleClass.js');

test('toggleClass is a Function', () => {
  expect(toggleClass).toBeInstanceOf(Function);
});
