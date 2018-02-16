const test = require('tape');
const show = require('./show.js');

test('Testing show', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof show === 'function', 'show is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(show(args..), 'Expected');
  //t.equal(show(args..), 'Expected');
  //t.false(show(args..), 'Expected');
  //t.throws(show(args..), 'Expected');
  t.end();
});
