const expect = require('expect');
const pickBy = require('./pickBy.js');


  test('pickBy is a Function', () => {
  expect(pickBy).toBeInstanceOf(Function);
});
  t.deepEqual(pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'), { 'a': 1, 'c': 3 }, 'Creates an object composed of the properties the given function returns truthy for.');
  

