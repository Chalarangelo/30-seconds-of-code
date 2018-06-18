const expect = require('expect');
const objectToPairs = require('./objectToPairs.js');


  test('objectToPairs is a Function', () => {
  expect(objectToPairs).toBeInstanceOf(Function);
});
  t.deepEqual(objectToPairs({ a: 1, b: 2 }), [['a',1],['b',2]], "Creates an array of key-value pair arrays from an object.");
  
