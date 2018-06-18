const expect = require('expect');
const hide = require('./hide.js');

test('Testing hide', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hide === 'function').toBeTruthy();
});
