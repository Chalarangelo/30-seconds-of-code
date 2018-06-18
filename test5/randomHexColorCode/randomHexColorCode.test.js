const expect = require('expect');
const randomHexColorCode = require('./randomHexColorCode.js');

test('Testing randomHexColorCode', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof randomHexColorCode === 'function').toBeTruthy();
  //t.deepEqual(randomHexColorCode(args..), 'Expected');
  expect(randomHexColorCode().length).toBe(7);
  expect(randomHexColorCode().startsWith('#')).toBeTruthy();
  expect(randomHexColorCode().slice(1).match(/[^0123456789abcdef]/i) === null).toBeTruthy();
});
