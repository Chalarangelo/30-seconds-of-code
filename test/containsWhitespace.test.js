const {containsWhitespace} = require('./_30s.js');

test('containsWhitespace is a Function', () => {
  expect(containsWhitespace).toBeInstanceOf(Function);
});
test('containsWhitespace returns true when there are whitespaces', () => {
  expect(containsWhitespace('Lorem Ipsum')).toBe(true);
});
test('containsWhitespace returns false when there are no whitespaces', () => {
  expect(containsWhitespace('LoremIpsum')).toBe(false);
});
