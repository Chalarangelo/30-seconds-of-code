const {unescapeHTML} = require('./_30s.js');

test('unescapeHTML is a Function', () => {
  expect(unescapeHTML).toBeInstanceOf(Function);
});
test('Unescapes escaped HTML characters.', () => {
  expect(unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;')).toBe(
    '<a href="#">Me & you</a>'
  );
});
