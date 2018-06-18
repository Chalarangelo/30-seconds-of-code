const expect = require('expect');
const cleanObj = require('./cleanObj.js');

test('Testing cleanObj', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof cleanObj === 'function').toBeTruthy();
  const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
  expect(cleanObj(testObj, ['a'], 'children')).toEqual({ a: 1, children : { a: 1}});
});