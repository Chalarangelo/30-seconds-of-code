const test = require('tape');
const stripHTMLTags = require('./stripHTMLTags.js');

test('Testing stripHTMLTags', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof stripHTMLTags === 'function', 'stripHTMLTags is a Function');
  //t.deepEqual(stripHTMLTags(args..), 'Expected');
  //t.equal(stripHTMLTags(args..), 'Expected');
  //t.false(stripHTMLTags(args..), 'Expected');
  //t.throws(stripHTMLTags(args..), 'Expected');
  t.end();
});