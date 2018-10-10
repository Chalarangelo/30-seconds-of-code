const expect = require('expect');
const {hide} = require('./_30s.js');

test('hide is a Function', () => {
  expect(hide).toBeInstanceOf(Function);
});
