const test = require('tape');
const bottomVisible = require('./bottomVisible.js');

test('Testing bottomVisible', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bottomVisible === 'function', 'bottomVisible is a Function');
  t.pass('Tested on 09/02/2018 by @chalarangelo');
  //t.deepEqual(bottomVisible(args..), 'Expected');
  //t.equal(bottomVisible(args..), 'Expected');
  //t.false(bottomVisible(args..), 'Expected');
  //t.throws(bottomVisible(args..), 'Expected');
  t.end();
});
