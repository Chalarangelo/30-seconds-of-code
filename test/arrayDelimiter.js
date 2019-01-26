const expect = require('expect');
const {arrayDelimiter} = require('./_30s.js');

test('arrayDelimiter is a Function', () => {
  expect(arrayDelimiter).toBeInstanceOf(Function);
});
