const expect = require('expect');
const httpDelete = require('./httpDelete.js');

test('httpDelete is a Function', () => {
  expect(httpDelete).toBeInstanceOf(Function);
});
