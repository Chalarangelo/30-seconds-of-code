const expect = require('expect');
const reverseString = require('./reverseString.js');


  test('reverseString is a Function', () => {
  expect(reverseString).toBeInstanceOf(Function);
});
  t.equal(reverseString('foobar'), 'raboof', "Reverses a string.");
  
