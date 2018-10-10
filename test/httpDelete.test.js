const expect = require('expect');
const {httpDelete} = require('./_30s.js');

test('httpDelete is a Function', () => {
  expect(httpDelete).toBeInstanceOf(Function);
});
