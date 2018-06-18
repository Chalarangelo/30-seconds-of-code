const expect = require('expect');
const isUpperCase = require('./isUpperCase.js');

test('Testing isUpperCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isUpperCase === 'function').toBeTruthy();
  //t.deepEqual(isUpperCase(args..), 'Expected');
  expect(isUpperCase('ABC')).toBe(true);
  expect(isUpperCase('abc')).toBe(false);
  expect(isUpperCase('A3@$')).toBe(true);
});