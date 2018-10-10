const expect = require('expect');
const {bottomVisible} = require('./_30s.js');

test('bottomVisible is a Function', () => {
  expect(bottomVisible).toBeInstanceOf(Function);
});
