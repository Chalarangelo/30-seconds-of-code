const test = require('tape');
const once = require('./once.js');

test('Testing once', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof once === 'function', 'once is a Function');
  //t.deepEqual(once(args..), 'Expected');
  //t.equal(once(args..), 'Expected');
  //t.false(once(args..), 'Expected');
  //t.throws(once(args..), 'Expected');
  t.end();
});