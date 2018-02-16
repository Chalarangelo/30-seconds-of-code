const test = require('tape');
const delay = require('./delay.js');

test('Testing delay', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof delay === 'function', 'delay is a Function');
  delay(
    function(text) {
      t.equals(text, 'test', 'Works as expecting, passing arguments properly');
    },
    1000,
    'test'
  );
  //t.deepEqual(delay(args..), 'Expected');
  //t.equal(delay(args..), 'Expected');
  //t.false(delay(args..), 'Expected');
  //t.throws(delay(args..), 'Expected');
  t.end();
});
