const test = require('tape');
const shuffle = require('./shuffle.js');

test('Testing shuffle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof shuffle === 'function', 'shuffle is a Function');
  const arr = [1,2,3,4,5,6];
  //t.notDeepEqual(shuffle(arr), arr, 'Shuffles the array'); Does not work always (got a test failing once)
  //t.deepEqual(shuffle(args..), 'Expected');
  //t.equal(shuffle(args..), 'Expected');
  //t.false(shuffle(args..), 'Expected');
  //t.throws(shuffle(args..), 'Expected');
  t.end();
});
