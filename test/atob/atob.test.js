const expect = require('expect');
const atob = require('./atob.js');

test('Testing atob', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof atob === 'function').toBeTruthy();
  expect(atob('Zm9vYmFy')).toBe('foobar');
  expect(atob('Z')).toBe('');
});
