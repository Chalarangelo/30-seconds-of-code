const expect = require('expect');
const timeTaken = require('./timeTaken.js');

test('timeTaken is a Function', () => {
  expect(timeTaken).toBeInstanceOf(Function);
});
