const test = require('tape');
const README = require('./README.js');

test('Testing README', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof README === 'function', 'README is a Function');
  //t.deepEqual(README(args..), 'Expected');
  //t.equal(README(args..), 'Expected');
  //t.false(README(args..), 'Expected');
  //t.throws(README(args..), 'Expected');
  t.end();
});