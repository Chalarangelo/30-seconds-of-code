const expect = require('expect');
const {compactWhitespace} = require('./_30s.js');

test('compactWhitespace is a Function', () => {
  expect(compactWhitespace).toBeInstanceOf(Function);
});
test('compactWhitespace returns a string with compacted whitespaces', () => {
  expect(compactWhitespace('Lorem Ipsum')).toBe('Lorem Ipsum');
});
test('compactWhitespace returns a string with compacted whitespaces', () => {
  expect(compactWhitespace('Lorem    Ipsum')).toBe('Lorem Ipsum');
});
test('compactWhitespace returns a string with compacted whitespaces', () => {
  expect(compactWhitespace('Lorem \t Ipsum')).toBe('Lorem Ipsum');
});
test('compactWhitespace returns a string with compacted whitespaces', () => {
  expect(compactWhitespace('\t   Lorem \n\n  \n Ipsum  ')).toBe('Lorem Ipsum');
});
