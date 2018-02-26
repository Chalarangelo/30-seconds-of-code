const test = require('tape');
const pad = require('./pad.js');

test('Testing pad', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pad === 'function', 'pad is a Function');
  t.equal(pad('cat'), '  cat   ', 'cat is padded on both sides');
  t.equal(pad('cat').length, 8, 'length of string is 8');
  t.equal(pad(String(42), 6, '0'), '004200', 'pads 42 with "0"');
  t.equal(pad('foobar', 3), 'foobar', 'does not truncates if string exceeds length');
  t.end();
});
