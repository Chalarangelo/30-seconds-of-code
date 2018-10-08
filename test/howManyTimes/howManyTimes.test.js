const expect = require('expect');
const howManyTimes = require('./howManyTimes.js');

test('howManyTimes is a Function', () => {
  expect(howManyTimes).toBeInstanceOf(Function);
});
