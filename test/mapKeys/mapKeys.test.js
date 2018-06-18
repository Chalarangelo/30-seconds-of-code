const expect = require('expect');
const mapKeys = require('./mapKeys.js');


  test('mapKeys is a Function', () => {
  expect(mapKeys).toBeInstanceOf(Function);
});
  t.deepEqual(mapKeys({ a: 1, b: 2 }, (val, key) => key + val), { a1: 1, b2: 2 }, 'Maps keys');
  

