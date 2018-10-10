const expect = require('expect');
const {pipeLog} = require('./_30s.js');

test('pipeLog is a Function', () => {
  expect(pipeLog).toBeInstanceOf(Function);
});
