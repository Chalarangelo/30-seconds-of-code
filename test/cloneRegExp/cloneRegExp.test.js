const expect = require('expect');
const cloneRegExp = require('./cloneRegExp.js');

test('Testing cloneRegExp', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof cloneRegExp === 'function').toBeTruthy();
  const rgTest = /./g;
  expect(cloneRegExp(rgTest)).not.toBe(rgTest);
});
