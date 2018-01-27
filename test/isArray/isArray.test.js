const test = require('tape');
const isArray = require('./isArray.js');

test('Testing isArray', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isArray === 'function', 'isArray is a Function');
  t.equal(isArray([1]), true, "passed value is an array");
  t.equal(isArray('array'), false, "passed value is not an array");
  //t.equal(isArray(args..), 'Expected');
  //t.false(isArray(args..), 'Expected');
  //t.throws(isArray(args..), 'Expected');
  t.end();
});