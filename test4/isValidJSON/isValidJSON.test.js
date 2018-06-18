const expect = require('expect');
const isValidJSON = require('./isValidJSON.js');

test('Testing isValidJSON', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isValidJSON === 'function').toBeTruthy();
  expect(isValidJSON('{"name":"Adam","age":20}')).toBe(true);
  expect(isValidJSON('{"name":"Adam",age:"20"}')).toBe(false);
  expect(isValidJSON(null)).toBe(true);
});