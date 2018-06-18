const expect = require('expect');
const unescapeHTML = require('./unescapeHTML.js');


  test('unescapeHTML is a Function', () => {
  expect(unescapeHTML).toBeInstanceOf(Function);
});
  t.equal(unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'),  '<a href="#">Me & you</a>', 'Unescapes escaped HTML characters.');
  
