const expect = require('expect');
const {getMeridiemSuffixOfInteger} = require('./_30s.js');

test('getMeridiemSuffixOfInteger is a Function', () => {
  expect(getMeridiemSuffixOfInteger).toBeInstanceOf(Function);
});
