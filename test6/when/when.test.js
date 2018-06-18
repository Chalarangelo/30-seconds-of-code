const expect = require('expect');
const when = require('./when.js');

test('Testing when', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof when === 'function').toBeTruthy();

  const doubleEvenNumbers = when(
    (x) => x % 2 === 0,
    (x) => x * 2
  );

  expect(doubleEvenNumbers(2) === 4).toBeTruthy();
  expect(doubleEvenNumbers(1) === 1).toBeTruthy();
});
