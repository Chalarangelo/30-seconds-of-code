const expect = require('expect');
const isSimilar = require('./isSimilar.js');

test('isSimilar is a Function', () => {
  expect(isSimilar).toBeInstanceOf(Function);
});
