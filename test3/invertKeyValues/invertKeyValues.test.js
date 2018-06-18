const expect = require('expect');
const invertKeyValues = require('./invertKeyValues.js');

test('Testing invertKeyValues', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof invertKeyValues === 'function').toBeTruthy();
  expect(invertKeyValues({ a: 1, b: 2, c: 1 })).toEqual({ 1: [ 'a', 'c' ], 2: [ 'b' ] });
  expect(invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value)).toEqual({ group1: [ 'a', 'c' ], group2: [ 'b' ] });
});