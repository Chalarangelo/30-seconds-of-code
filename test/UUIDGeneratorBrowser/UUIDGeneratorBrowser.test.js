const test = require('tape');
const UUIDGeneratorBrowser = require('./UUIDGeneratorBrowser.js');

test('Testing UUIDGeneratorBrowser', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof UUIDGeneratorBrowser === 'function', 'UUIDGeneratorBrowser is a Function');
  t.pass('Tested 09/02/2018 by @chalarangelo');
  //t.deepEqual(UUIDGeneratorBrowser(args..), 'Expected');
  //t.equal(UUIDGeneratorBrowser(args..), 'Expected');
  //t.false(UUIDGeneratorBrowser(args..), 'Expected');
  //t.throws(UUIDGeneratorBrowser(args..), 'Expected');
  t.end();
});
