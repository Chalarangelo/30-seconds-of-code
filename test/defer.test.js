const expect = require('expect');
const {defer} = require('./_30s.js');

test('defer is a Function', () => {
  expect(defer).toBeInstanceOf(Function);
});
