const test = require('tape');
const scrollToTop = require('./scrollToTop.js');

test('Testing scrollToTop', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof scrollToTop === 'function', 'scrollToTop is a Function');
  //t.deepEqual(scrollToTop(args..), 'Expected');
  //t.equal(scrollToTop(args..), 'Expected');
  //t.false(scrollToTop(args..), 'Expected');
  //t.throws(scrollToTop(args..), 'Expected');
  t.end();
});