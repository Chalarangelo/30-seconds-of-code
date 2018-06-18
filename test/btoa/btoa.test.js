const expect = require('expect');
const btoa = require('./btoa.js');

test('Testing btoa', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof btoa === 'function').toBeTruthy();
  expect(btoa('foobar')).toBe('Zm9vYmFy');
});
