const {times} = require('./_30s.js');

test('times is a Function', () => {
  expect(times).toBeInstanceOf(Function);
});
var output = '';
times(5, i => (output += i));
test('Runs a function the specified amount of times', () => {
  expect(output).toBe('01234');
});
