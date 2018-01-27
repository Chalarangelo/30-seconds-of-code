const test = require('tape');
const initial = require('./initial.js');

test('Testing initial', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof initial === 'function', 'initial is a Function');
  t.deepEqual(initial([1, 2, 3]), [1, 2], "Returns all the elements of an array except the last one");
  //t.deepEqual(initial(args..), 'Expected');
  //t.equal(initial(args..), 'Expected');
  //t.false(initial(args..), 'Expected');
  //t.throws(initial(args..), 'Expected');
  t.end();
});