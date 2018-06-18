const expect = require('expect');
const mapValues = require('./mapValues.js');


  test('mapValues is a Function', () => {
  expect(mapValues).toBeInstanceOf(Function);
});
  const users = {
    fred: { user: 'fred', age: 40 },
    pebbles: { user: 'pebbles', age: 1 }
  };
  t.deepEqual(mapValues(users, u => u.age), { fred: 40, pebbles: 1 }, 'Maps values');
  

