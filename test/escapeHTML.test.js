const {escapeHTML} = require('./_30s.js');

test('escapeHTML is a Function', () => {
  expect(escapeHTML).toBeInstanceOf(Function);
});
test('Escapes a string for use in HTML', () => {
  expect(escapeHTML('<a href="#">Me & you</a>')).toBe(
    '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
  );
});
