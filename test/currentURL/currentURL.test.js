const expect = require('expect');
const currentURL = require('./currentURL.js');

test('Testing currentURL', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof currentURL === 'function').toBeTruthy();
});
