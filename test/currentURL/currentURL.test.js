const test = require('tape');
const currentURL = require('./currentURL.js');

test('Testing currentURL', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof currentURL === 'function', 'currentURL is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(currentURL(args..), 'Expected');
  //t.equal(currentURL(args..), 'Expected');
  //t.false(currentURL(args..), 'Expected');
  //t.throws(currentURL(args..), 'Expected');
  t.end();
});
