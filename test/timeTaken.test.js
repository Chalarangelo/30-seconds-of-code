const {timeTaken} = require('./_30s.js');

test('timeTaken is a Function', () => {
  expect(timeTaken).toBeInstanceOf(Function);
});
test('timeTaken is a Function', () => {
  expect(timeTaken(() => 10)).toBe(10);
});
