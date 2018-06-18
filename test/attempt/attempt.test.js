const expect = require('expect');
const attempt = require('./attempt.js');

test('Testing attempt', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof attempt === 'function').toBeTruthy();
  expect(attempt(() => 0)).toBe(0);
  expect(attempt(() => {throw new Error();}) instanceof Error).toBeTruthy();
});
