const expect = require('expect');
const UUIDGeneratorBrowser = require('./UUIDGeneratorBrowser.js');

test('Testing UUIDGeneratorBrowser', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof UUIDGeneratorBrowser === 'function').toBeTruthy();
});
