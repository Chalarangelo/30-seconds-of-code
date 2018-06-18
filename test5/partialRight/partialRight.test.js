const expect = require('expect');
const partialRight = require('./partialRight.js');

test('Testing partialRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof partialRight === 'function').toBeTruthy();
  function greet(greeting, name) {
    return greeting + ' ' + name + '!';
  }
  const greetJohn = partialRight(greet, 'John');
  expect(greetJohn('Hello')).toBe('Hello John!');
});
