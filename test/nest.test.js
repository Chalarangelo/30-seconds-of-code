const expect = require('expect');
const {nest} = require('./_30s.js');

test('nest is a Function', () => {
  expect(nest).toBeInstanceOf(Function);
});
