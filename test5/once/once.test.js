const expect = require('expect');
const once = require('./once.js');

test('Testing once', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof once === 'function').toBeTruthy();
});
