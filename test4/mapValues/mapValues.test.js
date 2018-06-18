const expect = require('expect');
const mapValues = require('./mapValues.js');

test('Testing mapValues', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof mapValues === 'function').toBeTruthy();
  const users = {
    fred: { user: 'fred', age: 40 },
    pebbles: { user: 'pebbles', age: 1 }
  };
  expect(mapValues(users, u => u.age)).toEqual({ fred: 40, pebbles: 1 });
});
