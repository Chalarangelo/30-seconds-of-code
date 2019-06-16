const {mapValues} = require('./_30s.js');

test('mapValues is a Function', () => {
  expect(mapValues).toBeInstanceOf(Function);
});
const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
test('Maps values', () => {
  expect(mapValues(users, u => u.age)).toEqual({ fred: 40, pebbles: 1 });
});
