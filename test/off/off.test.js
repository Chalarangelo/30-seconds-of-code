const test = require('tape');
const off = require('./off.js');

test('Testing off', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof off === 'function', 'off is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(off(args..), 'Expected');
  //t.equal(off(args..), 'Expected');
  //t.false(off(args..), 'Expected');
  //t.throws(off(args..), 'Expected');
  t.end();
});
