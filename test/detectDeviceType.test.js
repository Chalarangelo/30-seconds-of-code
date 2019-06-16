const {detectDeviceType} = require('./_30s.js');

test('detectDeviceType is a Function', () => {
  expect(detectDeviceType).toBeInstanceOf(Function);
});
