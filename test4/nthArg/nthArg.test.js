const expect = require('expect');
const nthArg = require('./nthArg.js');

test('Testing nthArg', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof nthArg === 'function').toBeTruthy();
  const third = nthArg(2);
  expect(third(1, 2, 3)).toBe(3);
  expect(third(1, 2)).toBe(undefined);
  const last = nthArg(-1);
  expect(last(1, 2, 3, 4, 5)).toBe(5);
});
