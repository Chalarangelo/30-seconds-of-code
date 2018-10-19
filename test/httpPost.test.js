const expect = require('expect');
const {httpPost} = require('./_30s.js');

test('httpPost is a Function', () => {
  expect(httpPost).toBeInstanceOf(Function);
});
