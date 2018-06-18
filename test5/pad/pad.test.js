const expect = require('expect');
const pad = require('./pad.js');

test('Testing pad', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pad === 'function').toBeTruthy();
  expect(pad('cat',8)).toBe('  cat   ');
  expect(pad('cat',8).length).toBe(8);
  expect(pad(String(42), 6, '0')).toBe('004200');
  expect(pad('foobar', 3)).toBe('foobar');
});
