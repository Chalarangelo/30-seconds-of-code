const expect = require('expect');
const createElement = require('./createElement.js');

test('Testing createElement', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof createElement === 'function').toBeTruthy();
});
