const expect = require('expect');
const omit = require('./omit.js');


  test('omit is a Function', () => {
  expect(omit).toBeInstanceOf(Function);
});
  t.deepEqual(omit({ a: 1, b: '2', c: 3 }, ['b']), { 'a': 1, 'c': 3 }, 'Omits the key-value pairs corresponding to the given keys from an object');
  

