const test = require('tape');
const isBrowser = require('./isBrowser.js');

test('Testing isBrowser', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isBrowser === 'function', 'isBrowser is a Function');
  //t.deepEqual(isBrowser(args..), 'Expected');
  //t.equal(isBrowser(args..), 'Expected');
  //t.false(isBrowser(args..), 'Expected');
  //t.throws(isBrowser(args..), 'Expected');
  t.end();
});