const expect = require('expect');
const remove = require('./remove.js');

test('Testing remove', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof remove === 'function').toBeTruthy();
  expect(remove([1, 2, 3, 4], n => n % 2 === 0)).toEqual([2, 4]);
});
