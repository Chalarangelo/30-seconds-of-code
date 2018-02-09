const test = require('tape');
const shuffle = require('./shuffle.js');

test('Testing shuffle', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof shuffle === 'function', 'shuffle is a Function');
  const arr = [1,2,3,4,5,6];
  t.notEqual(shuffle(arr), arr, 'Shuffles the array');
  t.true(shuffle(arr).every(x => arr.includes(x)), 'New array contains all original elements');
  t.deepEqual(shuffle([]),[],'Works for empty arrays');
  t.deepEqual(shuffle([1]),[1],'Works for single-element arrays');
  //t.deepEqual(shuffle(args..), 'Expected');
  //t.equal(shuffle(args..), 'Expected');
  //t.false(shuffle(args..), 'Expected');
  //t.throws(shuffle(args..), 'Expected');
  t.end();
});
