const expect = require('expect');
const {orderBy} = require('./_30s.js');

test('orderBy is a Function', () => {
  expect(orderBy).toBeInstanceOf(Function);
});
const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
test('Returns a sorted array of objects ordered by properties and orders.', () => {
  expect(orderBy(users, ['name', 'age'], ['asc', 'desc'])).toEqual([
    { name: 'barney', age: 36 },
    { name: 'fred', age: 48 },
    { name: 'fred', age: 40 }
  ]);
});
test('Returns a sorted array of objects ordered by properties and orders.', () => {
  expect(orderBy(users, ['name', 'age'])).toEqual([
    { name: 'barney', age: 36 },
    { name: 'fred', age: 40 },
    { name: 'fred', age: 48 }
  ]);
});
