const test = require('tape');
const reduceWhich = require('./reduceWhich.js');

test('Testing reduceWhich', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof reduceWhich === 'function', 'reduceWhich is a Function');
  //t.deepEqual(reduceWhich(args..), 'Expected');
  //t.equal(reduceWhich(args..), 'Expected');
  //t.false(reduceWhich(args..), 'Expected');
  //t.throws(reduceWhich(args..), 'Expected');
  t.end();
});