const expect = require('expect');
const pad = require('./pad.js');


  test('pad is a Function', () => {
  expect(pad).toBeInstanceOf(Function);
});
  t.equal(pad('cat',8), '  cat   ', 'cat is padded on both sides');
  t.equal(pad('cat',8).length, 8, 'length of string is 8');
  t.equal(pad(String(42), 6, '0'), '004200', 'pads 42 with "0"');
  t.equal(pad('foobar', 3), 'foobar', 'does not truncates if string exceeds length');
  

