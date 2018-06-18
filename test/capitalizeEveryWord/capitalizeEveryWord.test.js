const expect = require('expect');
const capitalizeEveryWord = require('./capitalizeEveryWord.js');


  test('capitalizeEveryWord is a Function', () => {
  expect(capitalizeEveryWord).toBeInstanceOf(Function);
});
  t.equal(capitalizeEveryWord('hello world!'), 'Hello World!', "Capitalizes the first letter of every word in a string");
  t.equal(capitalizeEveryWord('$# @!'), '$# @!', "Works with characters");
  t.equal(capitalizeEveryWord('a'), 'A', "Works with one word string");
  
