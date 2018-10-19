const expect = require('expect');
const {show} = require('./_30s.js');

test('show is a Function', () => {
  expect(show).toBeInstanceOf(Function);
});
