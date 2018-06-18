const expect = require('expect');
const any = require('./any.js');

test('Testing any', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof any === 'function').toBeTruthy();
  expect(any([0,1,2,3])).toBeTruthy();
  expect(any([0,0])).toBeFalsy();
  expect(any([NaN,0,undefined,null,''])).toBeFalsy();
  expect(any([4,1,0,3], x => x >= 1)).toBeTruthy();
  expect(any([0,1], x => x < 0)).toBeFalsy();
});
