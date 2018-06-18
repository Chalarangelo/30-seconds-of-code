const expect = require('expect');
const JSONToFile = require('./JSONToFile.js');

test('Testing JSONToFile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof JSONToFile === 'function').toBeTruthy();
});
