const test = require('tape');
const isBrowserTabFocused = require('./isBrowserTabFocused.js');

test('Testing isBrowserTabFocused', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isBrowserTabFocused === 'function', 'isBrowserTabFocused is a Function');
  //t.deepEqual(isBrowserTabFocused(args..), 'Expected');
  //t.equal(isBrowserTabFocused(args..), 'Expected');
  //t.false(isBrowserTabFocused(args..), 'Expected');
  //t.throws(isBrowserTabFocused(args..), 'Expected');
  t.end();
});