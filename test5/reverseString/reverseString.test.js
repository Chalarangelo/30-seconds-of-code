const expect = require('expect');
const reverseString = require('./reverseString.js');

test('Testing reverseString', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof reverseString === 'function').toBeTruthy();
  expect(reverseString('foobar')).toBe('raboof');
});