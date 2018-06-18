const expect = require('expect');
const onUserInputChange = require('./onUserInputChange.js');

test('onUserInputChange is a Function', () => {
  expect(onUserInputChange).toBeInstanceOf(Function);
});
