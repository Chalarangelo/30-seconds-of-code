const expect = require('expect');
const get = require('./get.js');

test('Testing get', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof get === 'function').toBeTruthy();
  const obj = { selector: { to: { val: 'val to get' } } };
  expect(get(obj, 'selector.to.val')).toEqual(['val to get']);
});
