const test = require('tape');
const shuffle = require('./shuffle.js');

test('Testing shuffle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof shuffle === 'function', 'shuffle is a Function');
  //t.deepEqual(shuffle(args..), 'Expected');
  //t.equal(shuffle(args..), 'Expected');
  //t.false(shuffle(args..), 'Expected');
  //t.throws(shuffle(args..), 'Expected');
  t.end();
});