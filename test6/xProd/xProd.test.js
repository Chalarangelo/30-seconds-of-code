const expect = require('expect');
const xProd = require('./xProd.js');

test('Testing xProd', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof xProd === 'function').toBeTruthy();
  expect(xProd([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
});
