const test = require('tape');
const stripHTMLTags = require('./stripHTMLTags.js');

test('Testing stripHTMLTags', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof stripHTMLTags === 'function', 'stripHTMLTags is a Function');
  t.equals(stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p><img /><br>'), 'lorem ipsum', 'Removes HTML tags');
  //t.deepEqual(stripHTMLTags(args..), 'Expected');
  //t.equal(stripHTMLTags(args..), 'Expected');
  //t.false(stripHTMLTags(args..), 'Expected');
  //t.throws(stripHTMLTags(args..), 'Expected');
  t.end();
});
