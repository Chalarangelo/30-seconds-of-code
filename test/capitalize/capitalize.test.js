const expect = require('expect');
const capitalize = require('./capitalize.js');

test('Testing capitalize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof capitalize === 'function').toBeTruthy();
  expect(capitalize('fooBar')).toBe('FooBar');
  expect(capitalize('fooBar', true)).toBe('Foobar');
  expect(capitalize('#!#', true)).toBe('#!#');
  expect(capitalize('a', true)).toBe('A');
});