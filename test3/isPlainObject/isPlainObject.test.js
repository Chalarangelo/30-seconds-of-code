const expect = require('expect');
const isPlainObject = require('./isPlainObject.js');

test('Testing isPlainObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isPlainObject === 'function').toBeTruthy();
  expect(isPlainObject({ a: 1 })).toBe(true);
  expect(isPlainObject(new Map())).toBe(false);
});
