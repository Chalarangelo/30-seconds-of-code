const expect = require('expect');
const splitLines = require('./splitLines.js');

test('Testing splitLines', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof splitLines === 'function').toBeTruthy();
  expect(splitLines('This\nis a\nmultiline\nstring.\n')).toEqual(['This', 'is a', 'multiline', 'string.' , '']);
});