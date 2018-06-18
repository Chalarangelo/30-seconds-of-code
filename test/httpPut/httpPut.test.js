const expect = require('expect');
const httpPut = require('./httpPut.js');

test('httpPut is a Function', () => {
  expect(httpPut).toBeInstanceOf(Function);
});
