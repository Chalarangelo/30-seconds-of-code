const expect = require('expect');
const colorize = require('./colorize.js');

test('colorize is a Function', () => {
  expect(colorize).toBeInstanceOf(Function);
});
