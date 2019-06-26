const {sleep} = require('./_30s.js');

test('sleep is a Function', () => {
  expect(sleep).toBeInstanceOf(Function);
});
test('Works as expected', () => {
  return expect(sleep(1000)).resolves.toBe(undefined);
});
