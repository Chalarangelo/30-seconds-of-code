const expect = require('expect');
const sortCharactersInString = require('./sortCharactersInString.js');


  test('sortCharactersInString is a Function', () => {
  expect(sortCharactersInString).toBeInstanceOf(Function);
});
  t.equal(sortCharactersInString('cabbage'), 'aabbceg', "Alphabetically sorts the characters in a string.");
  
