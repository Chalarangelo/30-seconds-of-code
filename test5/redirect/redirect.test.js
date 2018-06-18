const expect = require('expect');
const redirect = require('./redirect.js');

test('Testing redirect', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof redirect === 'function').toBeTruthy();
});
