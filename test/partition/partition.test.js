const expect = require('expect');
const partition = require('./partition.js');


  test('partition is a Function', () => {
  expect(partition).toBeInstanceOf(Function);
});
  const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
  t.deepEqual(partition(users, o => o.active), [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]], "Groups the elements into two arrays, depending on the provided function's truthiness for each element.");
  
