const expect = require('expect');
const readFileLines = require('./readFileLines.js');

test('readFileLines is a Function', () => {
  expect(readFileLines).toBeInstanceOf(Function);
});
