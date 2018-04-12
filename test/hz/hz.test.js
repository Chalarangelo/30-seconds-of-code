const test = require('tape');
const hz = require('./hz.js');

test('Testing hz', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof hz === 'function', 'hz is a Function');
  //t.deepEqual(hz(args..), 'Expected');
  //t.equal(hz(args..), 'Expected');
  //t.false(hz(args..), 'Expected');
  //t.throws(hz(args..), 'Expected');
  t.end();
});