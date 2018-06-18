const expect = require('expect');
const escapeRegExp = require('./escapeRegExp.js');

test('Testing escapeRegExp', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof escapeRegExp === 'function').toBeTruthy();
  expect(escapeRegExp('(test)')).toBe('\\(test\\)');
});