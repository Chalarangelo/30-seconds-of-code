const expect = require('expect');
const castArray = require('./castArray.js');

test('Testing castArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof castArray === 'function').toBeTruthy();
  expect(castArray(1)).toEqual([1]);
  expect(castArray([1])).toEqual([1]);
  expect(castArray([1,2,3])).toEqual([1,2,3]);
  expect(castArray('test')).toEqual(['test']);
  expect(castArray({})).toEqual([{}]);
});
