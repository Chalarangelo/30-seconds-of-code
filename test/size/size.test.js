const expect = require('expect');
const size = require('./size.js');


  test('size is a Function', () => {
  expect(size).toBeInstanceOf(Function);
});
  t.equal(size([1, 2, 3, 4, 5]), 5, "Get size of arrays, objects or strings.");
  t.equal(size({ one: 1, two: 2, three: 3 }), 3, "Get size of arrays, objects or strings.");
  
