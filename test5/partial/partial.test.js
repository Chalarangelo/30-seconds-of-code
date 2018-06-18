const expect = require('expect');
const partial = require('./partial.js');

test('Testing partial', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof partial === 'function').toBeTruthy();
  function greet(greeting, name) {
    return greeting + ' ' + name + '!';
  }
  const greetHello = partial(greet, 'Hello');
  expect(greetHello('John')).toBe('Hello John!');
});
