const expect = require('expect');
const {onUserInputChange} = require('./_30s.js');

test('onUserInputChange is a Function', () => {
  expect(onUserInputChange).toBeInstanceOf(Function);
});
