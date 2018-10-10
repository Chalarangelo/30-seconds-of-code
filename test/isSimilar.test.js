const expect = require('expect');
const {isSimilar} = require('./_30s.js');

test('isSimilar is a Function', () => {
  expect(isSimilar).toBeInstanceOf(Function);
});
