const expect = require('expect');
const stripHTMLTags = require('./stripHTMLTags.js');

test('Testing stripHTMLTags', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof stripHTMLTags === 'function').toBeTruthy();
  expect(stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p><img /><br>')).toBe('lorem ipsum');
});
