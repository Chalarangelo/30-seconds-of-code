const expect = require('expect');
const escapeHTML = require('./escapeHTML.js');


  test('escapeHTML is a Function', () => {
  expect(escapeHTML).toBeInstanceOf(Function);
});
  t.equal(escapeHTML('<a href="#">Me & you</a>'), '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;', "Escapes a string for use in HTML");
  
