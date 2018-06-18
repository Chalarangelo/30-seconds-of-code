const expect = require('expect');
const splitLines = require('./splitLines.js');

test('splitLines is a Function', () => {
  expect(splitLines).toBeInstanceOf(Function);
});
test('Splits a multiline string into an array of lines.', () => {
  expect(splitLines('This\nis a\nmultiline\nstring.\n')).toEqual(['This', 'is a', 'multiline', 'string.', '']);
});
