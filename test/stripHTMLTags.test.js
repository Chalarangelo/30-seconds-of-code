const {stripHTMLTags} = require('./_30s.js');

test('stripHTMLTags is a Function', () => {
  expect(stripHTMLTags).toBeInstanceOf(Function);
});
test('Removes HTML tags', () => {
  expect(stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p><img /><br>')).toBe(
    'lorem ipsum'
  );
});
