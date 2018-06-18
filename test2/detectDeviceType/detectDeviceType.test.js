const expect = require('expect');
const detectDeviceType = require('./detectDeviceType.js');

test('Testing detectDeviceType', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof detectDeviceType === 'function').toBeTruthy();
});
