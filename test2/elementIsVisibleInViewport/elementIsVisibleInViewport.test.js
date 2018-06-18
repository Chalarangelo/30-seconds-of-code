const expect = require('expect');
const elementIsVisibleInViewport = require('./elementIsVisibleInViewport.js');

test('Testing elementIsVisibleInViewport', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof elementIsVisibleInViewport === 'function').toBeTruthy();
});
