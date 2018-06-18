const expect = require('expect');
const pullBy = require('./pullBy.js');

test('Testing pullBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pullBy === 'function').toBeTruthy();
  var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
  pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x);
  expect(myArray).toEqual([{ x: 2 }]);
});
