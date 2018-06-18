const expect = require('expect');
const arrayToHtmlList = require('./arrayToHtmlList.js');

test('Testing arrayToHtmlList', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof arrayToHtmlList === 'function').toBeTruthy();
});
