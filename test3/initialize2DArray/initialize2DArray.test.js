const expect = require('expect');
const initialize2DArray = require('./initialize2DArray.js');

test('Testing initialize2DArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof initialize2DArray === 'function').toBeTruthy();
  expect(initialize2DArray(2, 2, 0)).toEqual([[0,0], [0,0]]);
});