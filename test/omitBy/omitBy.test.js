const expect = require('expect');
const omitBy = require('./omitBy.js');


  test('omitBy is a Function', () => {
  expect(omitBy).toBeInstanceOf(Function);
});
  t.deepEqual(omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'), { b: '2' }, 'Creates an object composed of the properties the given function returns falsey for');
  

