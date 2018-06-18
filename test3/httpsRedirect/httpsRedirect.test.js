const expect = require('expect');
const httpsRedirect = require('./httpsRedirect.js');

test('Testing httpsRedirect', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof httpsRedirect === 'function').toBeTruthy();
});
