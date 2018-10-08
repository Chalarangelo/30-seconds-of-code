const expect = require('expect');
const pipeLog = require('./pipeLog.js');

test('pipeLog is a Function', () => {
  expect(pipeLog).toBeInstanceOf(Function);
});
