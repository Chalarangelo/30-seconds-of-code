const expect = require('expect');
const defaults = require('./defaults.js');


  test('defaults is a Function', () => {
  expect(defaults).toBeInstanceOf(Function);
});
  t.deepEqual(defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }), { a: 1, b: 2 }, 'Assigns default values for undefined properties');
  

