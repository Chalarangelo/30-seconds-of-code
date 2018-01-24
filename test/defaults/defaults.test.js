const test = require('tape');
const defaults = require('./defaults.js');

test('Testing defaults', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof defaults === 'function', 'defaults is a Function');
  //t.deepEqual(defaults(args..), 'Expected');
  //t.equal(defaults(args..), 'Expected');
  //t.false(defaults(args..), 'Expected');
  //t.throws(defaults(args..), 'Expected');
  t.end();
});