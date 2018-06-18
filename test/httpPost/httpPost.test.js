const expect = require('expect');
const httpPost = require('./httpPost.js');

test('httpPost is a Function', () => {
  expect(httpPost).toBeInstanceOf(Function);
});
