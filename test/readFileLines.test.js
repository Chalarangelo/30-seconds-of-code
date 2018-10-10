const expect = require('expect');
const {readFileLines} = require('./_30s.js');

test('readFileLines is a Function', () => {
  expect(readFileLines).toBeInstanceOf(Function);
});
