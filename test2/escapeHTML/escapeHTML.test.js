const expect = require('expect');
const escapeHTML = require('./escapeHTML.js');

test('Testing escapeHTML', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof escapeHTML === 'function').toBeTruthy();
  expect(escapeHTML('<a href="#">Me & you</a>')).toBe('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;');
});