const expect = require('expect');
const bottomVisible = require('./bottomVisible.js');

test('bottomVisible is a Function', () => {
  expect(bottomVisible).toBeInstanceOf(Function);
});
