const expect = require('expect');
const arrayToHtmlList = require('./arrayToHtmlList.js');

test('arrayToHtmlList is a Function', () => {
  expect(arrayToHtmlList).toBeInstanceOf(Function);
});
