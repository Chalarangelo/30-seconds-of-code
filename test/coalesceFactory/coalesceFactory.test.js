const expect = require('expect');
const coalesceFactory = require('./coalesceFactory.js');

test('Testing coalesceFactory', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof coalesceFactory === 'function').toBeTruthy();
  const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
  expect(customCoalesce(undefined, null, NaN, '', 'Waldo')).toEqual('Waldo');
});