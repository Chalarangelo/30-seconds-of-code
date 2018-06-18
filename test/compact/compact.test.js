const expect = require('expect');
const compact = require('./compact.js');

test('Testing compact', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof compact === 'function').toBeTruthy();
  expect(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])).toEqual([ 1, 2, 3, 'a', 's', 34 ]);
});