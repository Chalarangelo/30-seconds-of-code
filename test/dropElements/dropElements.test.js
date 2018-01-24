const test = require('tape');
const dropElements = require('./dropElements.js');

test('Testing dropElements', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof dropElements === 'function', 'dropElements is a Function');
  t.deepEqual(dropElements([1, 2, 3, 4], n => n >= 3), [3,4], "Removes elements in an array until the passed function returns true");
  //t.deepEqual(dropElements(args..), 'Expected');
  //t.equal(dropElements(args..), 'Expected');
  //t.false(dropElements(args..), 'Expected');
  //t.throws(dropElements(args..), 'Expected');
  t.end();
});