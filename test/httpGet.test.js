const expect = require('expect');
const {httpGet} = require('./_30s.js');

test('httpGet is a Function', () => {
  expect(httpGet).toBeInstanceOf(Function);
});
