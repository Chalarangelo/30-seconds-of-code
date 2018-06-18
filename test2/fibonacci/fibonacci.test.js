const expect = require('expect');
const fibonacci = require('./fibonacci.js');

test('Testing fibonacci', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof fibonacci === 'function').toBeTruthy();
  expect(fibonacci(6)).toEqual([0, 1, 1, 2, 3, 5]);
});