const expect = require('expect');
const none = require('./none.js');

test('Testing none', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof none === 'function').toBeTruthy();
  expect(none([0,undefined,NaN,null,''])).toBeTruthy();
  expect(none([0,1])).toBeFalsy();
  expect(none([4,1,0,3], x => x < 0)).toBeTruthy();
  expect(none([0,1,2], x => x === 1)).toBeFalsy();
});
