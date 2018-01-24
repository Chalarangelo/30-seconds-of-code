const test = require('tape');
const partition = require('./partition.js');

test('Testing partition', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof partition === 'function', 'partition is a Function');
  const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
  t.deepEqual(partition(users, o => o.active), [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]], "Groups the elements into two arrays, depending on the provided function's truthiness for each element.");
  //t.deepEqual(partition(args..), 'Expected');
  //t.equal(partition(args..), 'Expected');
  //t.false(partition(args..), 'Expected');
  //t.throws(partition(args..), 'Expected');
  t.end();
});