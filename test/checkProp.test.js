const expect = require('expect');
const {checkProp} = require('./_30s.js');

test('checkProp is a Function', () => {
  expect(checkProp).toBeInstanceOf(Function);
});
