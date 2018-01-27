const test = require('tape');
const uniqueElements = require('./uniqueElements.js');

test('Testing uniqueElements', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof uniqueElements === 'function', 'uniqueElements is a Function');
  t.deepEqual(uniqueElements([1, 2, 2, 3, 4, 4, 5]), [1,2,3,4,5], "Returns all unique values of an array");
  //t.deepEqual(uniqueElements(args..), 'Expected');
  //t.equal(uniqueElements(args..), 'Expected');
  //t.false(uniqueElements(args..), 'Expected');
  //t.throws(uniqueElements(args..), 'Expected');
  t.end();
});