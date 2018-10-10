const expect = require('expect');
const {timeTaken} = require('./_30s.js');

test('timeTaken is a Function', () => {
  expect(timeTaken).toBeInstanceOf(Function);
});
