const expect = require('expect');
const partition = require('./partition.js');

test('Testing partition', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof partition === 'function').toBeTruthy();
  const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
  expect(partition(users, o => o.active)).toEqual(
    [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
  );
});