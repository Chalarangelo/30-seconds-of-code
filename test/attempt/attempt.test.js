const test = require('tape');
const attempt = require('./attempt.js');

test('Testing attempt', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof attempt === 'function', 'attempt is a Function');
  t.equals(attempt(() => 0), 0, 'Returns a value');
  t.true(attempt(() => {throw new Error()}) instanceof Error, 'Returns an error');
  //t.deepEqual(attempt(args..), 'Expected');
  //t.equal(attempt(args..), 'Expected');
  //t.false(attempt(args..), 'Expected');
  //t.throws(attempt(args..), 'Expected');
  t.end();
});
