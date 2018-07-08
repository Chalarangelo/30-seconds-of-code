const expect = require('expect');
const dig = require('./dig.js');

test('dig is a Function', () => {
  expect(dig).toBeInstanceOf(Function);
});