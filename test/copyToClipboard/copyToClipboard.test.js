const test = require('tape');
const copyToClipboard = require('./copyToClipboard.js');

test('Testing copyToClipboard', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof copyToClipboard === 'function', 'copyToClipboard is a Function');
  t.pass('Tested on 09/02/2018 by @chalarangelo');
  //t.deepEqual(copyToClipboard(args..), 'Expected');
  //t.equal(copyToClipboard(args..), 'Expected');
  //t.false(copyToClipboard(args..), 'Expected');
  //t.throws(copyToClipboard(args..), 'Expected');
  t.end();
});
