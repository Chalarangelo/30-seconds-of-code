const expect = require('expect');
const mostPerformant = require('./mostPerformant.js');

test('mostPerformant is a Function', () => {
  expect(mostPerformant).toBeInstanceOf(Function);
});
