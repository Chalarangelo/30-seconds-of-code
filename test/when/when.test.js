const test = require('tape');
const when = require('./when.js');

test('Testing when', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof when === 'function', 'when is a Function');

  const doubleEvenNumbers = when(
    (x) => x % 2 === 0,
    (x) => x * 2
  );

  t.true(doubleEvenNumbers(2) === 4);
  t.true(doubleEvenNumbers(1) === 1);

  t.end();
});
