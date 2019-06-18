const {pipeLog} = require('./_30s.js');

test('pipeLog is a Function', () => {
  expect(pipeLog).toBeInstanceOf(Function);
});
test('pipeLog returns the given value', () => {
  expect(pipeLog('hi')).toBe('hi');
});
