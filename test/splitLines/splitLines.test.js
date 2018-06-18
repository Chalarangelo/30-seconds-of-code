const expect = require('expect');
const splitLines = require('./splitLines.js');


  test('splitLines is a Function', () => {
  expect(splitLines).toBeInstanceOf(Function);
});
  t.deepEqual(splitLines('This\nis a\nmultiline\nstring.\n'), ['This', 'is a', 'multiline', 'string.' , ''], "Splits a multiline string into an array of lines.");
  
