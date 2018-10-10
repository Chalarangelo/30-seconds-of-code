const expect = require('expect');
const {mostPerformant} = require('./_30s.js');

test('mostPerformant is a Function', () => {
  expect(mostPerformant).toBeInstanceOf(Function);
});
