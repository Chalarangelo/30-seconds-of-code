const test = require('tape');
const counter = require('./counter.js');

test('Testing counter', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof counter === 'function', 'counter is a Function');
  //t.deepEqual(counter(args..), 'Expected');
  //t.equal(counter(args..), 'Expected');
  //t.false(counter(args..), 'Expected');
  //t.throws(counter(args..), 'Expected');
  t.end();
});