const test = require('tape');
const hashBrowser = require('./hashBrowser.js');

test('Testing hashBrowser', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof hashBrowser === 'function', 'hashBrowser is a Function');
  //t.deepEqual(hashBrowser(args..), 'Expected');
  //t.equal(hashBrowser(args..), 'Expected');
  //t.false(hashBrowser(args..), 'Expected');
  //t.throws(hashBrowser(args..), 'Expected');
  t.end();
});