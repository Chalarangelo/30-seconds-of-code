const {createDirIfNotExists} = require('./_30s.js');

test('createDirIfNotExists is a Function', () => {
  expect(createDirIfNotExists).toBeInstanceOf(Function);
});
