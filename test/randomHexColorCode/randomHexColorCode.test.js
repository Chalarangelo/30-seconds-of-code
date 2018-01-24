const test = require('tape');
const randomHexColorCode = require('./randomHexColorCode.js');

test('Testing randomHexColorCode', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof randomHexColorCode === 'function', 'randomHexColorCode is a Function');
  //t.deepEqual(randomHexColorCode(args..), 'Expected');
  //t.equal(randomHexColorCode(args..), 'Expected');
  //t.false(randomHexColorCode(args..), 'Expected');
  //t.throws(randomHexColorCode(args..), 'Expected');
  t.end();
});