const expect = require('expect');
const orderBy = require('./orderBy.js');

test('Testing orderBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof orderBy === 'function').toBeTruthy();
  const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
  expect(orderBy(users, ['name', 'age'], ['asc', 'desc'])).toEqual(
    [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
  );
  expect(orderBy(users, ['name', 'age'])).toEqual(
    [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
  );
});