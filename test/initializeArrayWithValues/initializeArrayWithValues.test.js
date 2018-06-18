const expect = require('expect');
const initializeArrayWithValues = require('./initializeArrayWithValues.js');


  test('initializeArrayWithValues is a Function', () => {
  expect(initializeArrayWithValues).toBeInstanceOf(Function);
});
  t.deepEqual(initializeArrayWithValues(5, 2), [2, 2, 2, 2, 2], "Initializes and fills an array with the specified values");
  
