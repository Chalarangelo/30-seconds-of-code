const expect = require('expect');
const httpGet = require('./httpGet.js');

test('httpGet is a Function', () => {
  expect(httpGet).toBeInstanceOf(Function);
});
