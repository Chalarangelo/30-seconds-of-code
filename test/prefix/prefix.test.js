const expect = require('expect');
const prefix = require('./prefix.js');

test('prefix is a Function', () => {
  expect(prefix).toBeInstanceOf(Function);
});  
