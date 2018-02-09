const test = require('tape');
const randomIntArrayInRange = require('./randomIntArrayInRange.js');

test('Testing randomIntArrayInRange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof randomIntArrayInRange === 'function', 'randomIntArrayInRange is a Function');
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  const arr = randomIntArrayInRange(lowerLimit,upperLimit, 10);
  t.true(arr.every(x => typeof x === 'number'), 'The returned array contains only integers');
  t.equal(arr.length, 10, 'The returned array has the proper length');
  t.true(arr.every(x => (x >= lowerLimit) && (x <= upperLimit)),'The returned array\'s values lie between provided lowerLimit and upperLimit (both inclusive).');
  //t.deepEqual(randomIntArrayInRange(args..), 'Expected');
  //t.equal(randomIntArrayInRange(args..), 'Expected');
  //t.false(randomIntArrayInRange(args..), 'Expected');
  //t.throws(randomIntArrayInRange(args..), 'Expected');
  t.end();
});
