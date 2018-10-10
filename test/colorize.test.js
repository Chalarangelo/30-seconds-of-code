const expect = require('expect');
const {colorize} = require('./_30s.js');

test('colorize is a Function', () => {
  expect(colorize).toBeInstanceOf(Function);
});
