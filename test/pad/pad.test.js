const expect = require('expect');
const pad = require('./pad.js');


  test('pad is a Function', () => {
  expect(pad).toBeInstanceOf(Function);
});
  test('cat is padded on both sides', () => {
  expect(pad('cat',8), '  cat   ').toBe()
});
  test('length of string is 8', () => {
  expect(pad('cat',8).length, 8).toBe()
});
  test('pads 42 with "0"', () => {
  expect(pad(String(42), 6, '0'), '004200').toBe()
});
  test('does not truncates if string exceeds length', () => {
  expect(pad('foobar', 3), 'foobar').toBe()
});
  

