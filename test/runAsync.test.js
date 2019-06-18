const {runAsync} = require('./_30s.js');

test('runAsync is a Function', () => {
  expect(runAsync).toBeInstanceOf(Function);
});
