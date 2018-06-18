const expect = require('expect');
const detectDeviceType = require('./detectDeviceType.js');

test('detectDeviceType is a Function', () => {
  expect(detectDeviceType).toBeInstanceOf(Function);
});
