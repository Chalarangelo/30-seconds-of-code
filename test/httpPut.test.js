const expect = require('expect');
const {httpPut} = require('./_30s.js');

test('httpPut is a Function', () => {
  expect(httpPut).toBeInstanceOf(Function);
});
