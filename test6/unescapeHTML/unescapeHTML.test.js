const expect = require('expect');
const unescapeHTML = require('./unescapeHTML.js');

test('Testing unescapeHTML', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unescapeHTML === 'function').toBeTruthy();
  expect(unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;')).toBe('<a href="#">Me & you</a>');
});