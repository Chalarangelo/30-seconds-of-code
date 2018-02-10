const test = require('tape');
const randomIntArrayInRange = require('./randomIntArrayInRange.js');

test('Testing randomIntArrayInRange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof randomIntArrayInRange === 'function', 'randomIntArrayInRange is a Function');
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  const randLength = Math.floor(Math.random() * 10)
  t.true(randomIntArrayInRange(lowerLimit,upperLimit).length === 1,'The default value of returned array is 1');
  t.true(randomIntArrayInRange(lowerLimit,upperLimit,randLength).length === randLength,'The length of returned array is the same as the provided value.')
  t.true(randomIntArrayInRange(lowerLimit,upperLimit,randLength).filter(el => !((el>=lowerLimit) && (el <= upperLimit))).length === 0,'The returned values is in range.')
  //t.deepEqual(randomIntArrayInRange(args..), 'Expected');
  //t.equal(randomIntArrayInRange(args..), 'Expected');
  //t.false(randomIntArrayInRange(args..), 'Expected');
  //t.throws(randomIntArrayInRange(args..), 'Expected');
  t.end();
});