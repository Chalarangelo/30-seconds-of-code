const expect = require('expect');
const nthElement = require('./nthElement.js');


  test('nthElement is a Function', () => {
  expect(nthElement).toBeInstanceOf(Function);
});
  t.equal(nthElement(['a', 'b', 'c'], 1), 'b', "Returns the nth element of an array.");
  t.equal(nthElement(['a', 'b', 'c'], -3), 'a', "Returns the nth element of an array.");
  
