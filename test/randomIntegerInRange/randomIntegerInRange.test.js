const test = require('tape');
const randomIntegerInRange = require('./randomIntegerInRange.js');

test('Testing randomIntegerInRange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof randomIntegerInRange === 'function', 'randomIntegerInRange is a Function');
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  t.true(Number.isInteger(randomIntegerInRange(lowerLimit,upperLimit)),'The returned value is an integer');
  const numberForTest = randomIntegerInRange(lowerLimit,upperLimit);
  t.true((numberForTest >= lowerLimit) && (numberForTest <= upperLimit),'The returned value lies between provided lowerLimit and upperLimit (both inclusive).');
  //t.deepEqual(randomIntegerInRange(args..), 'Expected');
  //t.equal(randomIntegerInRange(args..), 'Expected');
  //t.false(randomIntegerInRange(args..), 'Expected');
  //t.throws(randomIntegerInRange(args..), 'Expected');
  t.end();
});
