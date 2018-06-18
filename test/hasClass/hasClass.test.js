const expect = require('expect');
const hasClass = require('./hasClass.js');

test('hasClass is a Function', () => {
  expect(hasClass).toBeInstanceOf(Function);
});  
