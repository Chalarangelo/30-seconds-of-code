const test = require('tape');
const on = require('./on.js');

test('Testing on', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof on === 'function', 'on is a Function');
  //t.deepEqual(on(args..), 'Expected');
  //t.equal(on(args..), 'Expected');
  //t.false(on(args..), 'Expected');
  //t.throws(on(args..), 'Expected');
  t.end();
});