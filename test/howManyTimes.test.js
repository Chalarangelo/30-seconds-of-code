const expect = require('expect');
const {howManyTimes} = require('./_30s.js');

test('howManyTimes is a Function', () => {
  expect(howManyTimes).toBeInstanceOf(Function);
});
