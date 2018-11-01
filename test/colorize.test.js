const expect = require('expect');
const {colorize} = require('./_30s.js');

test('colorize is a Function', () => {
  expect(colorize).toBeInstanceOf(Function);
});
test('Returns the appropriate value', () => {
  expect(colorize('x').black).toBe('\x1b[30mx');
});
