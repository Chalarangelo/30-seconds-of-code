const expect = require('expect');
const all = require('./all.js');

test('Testing all', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof all === 'function').toBeTruthy();
  expect(all([4,1,2,3])).toBeTruthy();
  expect(all([0,1])).toBeFalsy();
  expect(all([NaN,1])).toBeFalsy();
  expect(all([undefined,1])).toBeFalsy();
  expect(all([null,1])).toBeFalsy();
  expect(all(['',1])).toBeFalsy();
  expect(all([4,1,2,3], x => x >= 1)).toBeTruthy();
  expect(all([0,1], x => x >= 1)).toBeFalsy();
});
