const expect = require('expect');
const {off} = require('./_30s.js');

test('off is a Function', () => {
  expect(off).toBeInstanceOf(Function);
});
