const expect = require('expect');
const getStyle = require('./getStyle.js');

test('Testing getStyle', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getStyle === 'function').toBeTruthy();
});
