const test = require('tape');
const getScrollPosition = require('./getScrollPosition.js');

test('Testing getScrollPosition', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof getScrollPosition === 'function', 'getScrollPosition is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(getScrollPosition(args..), 'Expected');
  //t.equal(getScrollPosition(args..), 'Expected');
  //t.false(getScrollPosition(args..), 'Expected');
  //t.throws(getScrollPosition(args..), 'Expected');
  t.end();
});
