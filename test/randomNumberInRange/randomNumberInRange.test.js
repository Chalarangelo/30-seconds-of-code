const test = require('tape');
const randomNumberInRange = require('./randomNumberInRange.js');

test('Testing randomNumberInRange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof randomNumberInRange === 'function', 'randomNumberInRange is a Function');
  const lowerLimit = Math.floor(Math.random() * 20);
  const upperLimit = Math.floor(lowerLimit + Math.random() * 10);
  const numberForTest = randomNumberInRange(lowerLimit,upperLimit);
  t.true((numberForTest >= lowerLimit) && (numberForTest <= upperLimit),'The returned value lies between provied lowerLimit and upperLimit (both inclusive).');
  //t.deepEqual(randomNumberInRange(args..), 'Expected');
  //t.equal(randomNumberInRange(args..), 'Expected');
  //t.false(randomNumberInRange(args..), 'Expected');
  //t.throws(randomNumberInRange(args..), 'Expected');
  t.end();
});