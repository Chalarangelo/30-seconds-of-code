const test = require('tape');
const remove = require('./remove.js');

test('Testing remove', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof remove === 'function', 'remove is a Function');
  t.deepEqual(remove([1, 2, 3, 4], n => n % 2 == 0), [2, 4], "Removes elements from an array for which the given function returns false");
  //t.deepEqual(remove(args..), 'Expected');
  //t.equal(remove(args..), 'Expected');
  //t.false(remove(args..), 'Expected');
  //t.throws(remove(args..), 'Expected');
  t.end();
});