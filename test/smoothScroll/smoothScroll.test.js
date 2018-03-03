const test = require('tape');
const smoothScroll = require('./smoothScroll.js');

test('Testing smoothScroll', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof smoothScroll === 'function', 'smoothScroll is a Function');
  //t.deepEqual(smoothScroll(args..), 'Expected');
  //t.equal(smoothScroll(args..), 'Expected');
  //t.false(smoothScroll(args..), 'Expected');
  //t.throws(smoothScroll(args..), 'Expected');
  t.end();
});