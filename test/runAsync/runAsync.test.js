const test = require('tape');
const runAsync = require('./runAsync.js');

test('Testing runAsync', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof runAsync === 'function', 'runAsync is a Function');
  t.pass('Tested on 09/02/2018 by @chalarangelo');
  //t.deepEqual(runAsync(args..), 'Expected');
  //t.equal(runAsync(args..), 'Expected');
  //t.false(runAsync(args..), 'Expected');
  //t.throws(runAsync(args..), 'Expected');
  t.end();
});
